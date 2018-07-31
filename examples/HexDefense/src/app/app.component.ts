import { Component, AfterViewInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { GameLoop } from './GameLoop';
import { utc, duration, Moment } from 'moment';
import { HexMap, Hex, Vec2D, Layout, Orientation } from '@hexagine/index';
import { BombTower, Bullet, Enemy, GameObject, Tower, IMovable, StandardTower, IProjectile, TowerFactory } from './GameObjects';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends GameLoop implements AfterViewInit {

  private readonly MAP_HEIGHT = 11;
  private readonly MAP_WIDTH = 5;

  private readonly EnemySpawnRate = 0.3;

  private readonly hexMap: HexMap;

  private layout: Layout;

  @ViewChild('container')
  private containerRef: ElementRef<HTMLDivElement>;
  @ViewChild('canvas')
  private canvasRef: ElementRef<HTMLCanvasElement>;
  private ctx: CanvasRenderingContext2D;

  public lives = 10;
  public gold = 1000;

  public towerTypes = [
    new TowerFactory(StandardTower, { price: 200, name: 'Standard Turrret' }),
    new TowerFactory(BombTower, { price: 400, name: 'Bomb Tower' }),
  ];
  private selectedTower = this.towerTypes[0];

  private selectedHex = new Hex(0, 0, 0);

  private lastUpdateTime = utc();
  private lastDrawTime = utc();
  private lastEnemySpawn = utc();

  private enemies: Enemy[] = [];
  private towers: Tower[] = [];
  private projectiles: IProjectile[] = [];

  private start = new Hex(2, 0, -2);
  private goal = new Hex(-3, 10, -7);
  private enemyPath: Hex[] = [];

  constructor() {
    super();
    const hexagons: Hex[] = [];
    for (let r = 0; r < this.MAP_HEIGHT; r++) {
      const r_offset = Math.floor(r / 2);
      for (let q = -r_offset; q < this.MAP_WIDTH - r_offset; q++) {
        if (r % 2 !== 1 || !(q === this.MAP_WIDTH - r_offset - 1)) {
          hexagons.push(new Hex(q, r, -q - r));
        }
      }
    }
    this.hexMap = new HexMap(hexagons);
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    this.selectedHex = this.layout.pixelToHex(new Vec2D(e.clientX, e.clientY)).round();
  }

  @HostListener('document:mousedown', ['$event'])
  onMouseDown(e: MouseEvent) {
    const selectedHex = this.layout.pixelToHex(new Vec2D(e.clientX, e.clientY)).round();
    if (e.button === 0) {
      if (this.gold >= this.selectedTower.metadata.price && this.getTraversableHexMap().contains(selectedHex)) {
        if (this.towers.find((tower) => tower.position.equals(selectedHex)) === undefined) {
          const tempMap = new HexMap(this.getTraversableHexMap().getElements().filter((element) => !element.equals(selectedHex)));
          const newPath = tempMap.findPath(this.start, this.goal);
          if (newPath.hasPath) {
            this.towers.push(this.selectedTower.createInstance(selectedHex));
            this.enemyPath = newPath.path;
            this.gold -= this.selectedTower.metadata.price;
          }
        }
      } else {
        this.towers = this.towers.filter((tower) => !tower.position.equals(selectedHex));
        this.enemyPath = this.getTraversableHexMap().findPath(this.start, this.goal).path;
      }
    }
  }

  public ngAfterViewInit(): void {
    this.onResize();
    this.ctx = this.canvasRef.nativeElement.getContext('2d');

    this.enemyPath = this.getTraversableHexMap().findPath(this.start, this.goal).path;

    this.startLoop();
  }

  private isMovable(gameObject: GameObject): gameObject is IMovable {
    return 'direction' in gameObject && 'speed' in gameObject;
  }

  private getTraversableHexMap(): HexMap {
    const elements = this.hexMap.getElements().filter((hex) => !this.towers.some((tower) => tower.position.equals(hex)));
    return new HexMap(elements);
  }

  private renderHealthBar(orgin: Vec2D, maxHealth: number, currentHealth: number) {
    if (currentHealth < maxHealth) {
      const width = this.layout.size.x * (2 / 3);
      const height = this.layout.size.x / 7;

      const x = orgin.x - width / 2;
      const y = orgin.y - this.layout.size.y / 2;

      const percentage = currentHealth / maxHealth;

      this.ctx.fillStyle = '#FF0000';
      this.ctx.fillRect(x, y, width, height);
      this.ctx.fillStyle = '#00FF00';
      this.ctx.fillRect(x, y, width * percentage, height);
    }
  }

  private renderGameObject(gameObject: GameObject, elapsedMilliseconds: number) {
    let gameObjectPos = gameObject.position;
    if (this.isMovable(gameObject)) {
      gameObjectPos = gameObjectPos.add(gameObject.direction.scale(elapsedMilliseconds * gameObject.speed / 1000));
    }
    const pixelPosition = this.layout.hexToPixel(gameObjectPos);
    if (gameObject.sprite) {
      const imageWidth = (gameObject.sprite.width * this.layout.size.x) / 20;
      const imageHeight = (gameObject.sprite.height * this.layout.size.y) / 20;
      this.ctx.drawImage(gameObject.sprite,
        (pixelPosition.x - imageWidth / 2),
        (pixelPosition.y - imageHeight / 2),
        imageWidth,
        imageHeight);
    }
    if (gameObject instanceof Enemy) {
      this.renderHealthBar(pixelPosition, gameObject.maxHealth, gameObject.health);
    }
  }

  public draw(frame: number) {
    const currentDrawTime = utc();
    const elapsedMilliseconds = duration(currentDrawTime.diff(this.lastUpdateTime)).asMilliseconds();

    this.ctx.clearRect(0, 0, this.canvasRef.nativeElement.width, this.canvasRef.nativeElement.height);

    this.hexMap.getElements().forEach(element => {
      this.strokeHex(element);
    });

    this.enemyPath.forEach(element => {
      this.fillHex(element, '#DCDCDC');
    });

    this.strokeHex(this.selectedHex, '#FF0000', 3);

    const selectedTower = this.towers.find((tower) => tower.position.equals(this.selectedHex));
    if (selectedTower !== undefined) {
      this.strokeCircle(this.layout.hexToPixel(this.selectedHex), selectedTower.range * this.layout.size.getNorm());
    }

    this.enemies.forEach((enemy) => {
      this.renderGameObject(enemy, elapsedMilliseconds);
    });
    this.projectiles.forEach((bullet) => {
      this.renderGameObject(bullet, elapsedMilliseconds);
    });
    this.towers.forEach((tower) => {
      this.renderGameObject(tower, elapsedMilliseconds);
    });
    this.lastDrawTime = currentDrawTime;
  }

  public update(updateTick: number) {
    const currentUpdateTime = utc();
    const elapsedMilliseconds = duration(currentUpdateTime.diff(this.lastUpdateTime)).asMilliseconds();
    if (duration(currentUpdateTime.diff(this.lastEnemySpawn)).asSeconds() > this.EnemySpawnRate) {
      this.enemies.push(new Enemy(this.start));
      this.lastEnemySpawn = currentUpdateTime;
    }

    this.updateEnemies(elapsedMilliseconds);

    this.updateTowers(currentUpdateTime);

    this.updateProjectiles(elapsedMilliseconds);

    if (this.lives < 0) {
      this.stopLoop();
    }

    this.lastUpdateTime = currentUpdateTime;
  }

  private updateProjectiles(elapsedMilliseconds: number) {
    const projectiles = [...this.projectiles];
    for (const projectile of projectiles) {
      const targetVector = projectile.target.position.subtract(projectile.position);
      const newPosition = projectile.position.add(projectile.direction.scale(elapsedMilliseconds * projectile.speed / 1000));
      const travelVector = newPosition.subtract(projectile.position);
      if (travelVector.getNorm() > targetVector.getNorm()) {
        if (projectile.areaOfEffectRange === 0) {
          // Single Target
          projectile.target.health -= projectile.damage;
          if (projectile.target.health <= 0) {
            this.gold += projectile.target.bounty;
            this. enemies = this.enemies.filter((e) => e !== projectile.target);
          }
        } else {
          // Area of Effect
          const enemies = [...this.enemies];
          for (const enemy of enemies) {
            const distanceToTarget = enemy.position.euclideanDistance(projectile.target.position);
            if (distanceToTarget <= projectile.areaOfEffectRange) {
              const damage = projectile.damage * (projectile.areaOfEffectRange - distanceToTarget) / projectile.areaOfEffectRange;
              enemy.health -= Math.ceil(damage);
              if (enemy.health <= 0) {
                this.gold += enemy.bounty;
                this.enemies = this.enemies.filter((e) => e !== enemy);
              }
            }
          }
        }
        this.projectiles = this.projectiles.filter((p) => p !== projectile);
      }
      projectile.direction = targetVector.normalize();
      projectile.position = newPosition;
    }
  }

  private updateEnemies(elapsedMilliseconds: number) {
    const enemies = [...this.enemies];
    for (const enemy of enemies) {
      const roundedHex = enemy.position.round();
      const newPosition = enemy.position.add(enemy.direction.scale(elapsedMilliseconds * enemy.speed / 1000));
      let roundedHexIndex = this.enemyPath.findIndex((element) => element.equals(roundedHex));
      if (roundedHexIndex === -1) {
        const closestHexInPath = this.findClosestHex(roundedHex, this.enemyPath);
        roundedHexIndex = this.enemyPath.findIndex((element) => element.equals(closestHexInPath));
        enemy.direction = this.enemyPath[roundedHexIndex].subtract(enemy.position).normalize();
        enemy.position = enemy.position.add(enemy.direction.scale(elapsedMilliseconds * enemy.speed / 1000));
      } else if (newPosition.manhattanDistance(roundedHex) > enemy.position.manhattanDistance(roundedHex)) {
        enemy.direction = this.enemyPath[roundedHexIndex + 1].subtract(enemy.position).normalize();
        enemy.position = enemy.position.add(enemy.direction.scale(elapsedMilliseconds * enemy.speed / 1000));
      } else {
        enemy.position = newPosition;
      }
      if (enemy.position.round().equals(this.goal)) {
        this.enemies = this.enemies.filter((e) => e !== enemy);
        this.lives -= 1;
      }
    }
  }

  private updateTowers(currentUpdateTime: Moment) {
    for (const tower of this.towers) {
      if (duration(currentUpdateTime.diff(tower.lastFired)).asSeconds() > tower.rateOfFire) {
        if (this.enemies.length !== 0) {
          const enemiesInRange = this.enemies.filter((enemy) => enemy.position.subtract(tower.position).getNorm() < tower.range);
          if (enemiesInRange.length !== 0) {
            const target = this.findClosestEnemy(tower.position, enemiesInRange);
            this.projectiles.push(tower.getProjectile(target));
            tower.lastFired = currentUpdateTime;
          }
        }
      }
    }
  }

  public onResize() {
    const containerWidth = this.containerRef.nativeElement.offsetWidth;
    const containerHeight = this.containerRef.nativeElement.offsetHeight;
    this.canvasRef.nativeElement.width = containerWidth;
    this.canvasRef.nativeElement.height = containerHeight;

    const hexSize = (this.canvasRef.nativeElement.height / this.MAP_HEIGHT) * (3.8 / 6);
    this.layout = new Layout(Orientation.POINTY,
      new Vec2D(hexSize, hexSize),
      new Vec2D((containerWidth / 2 - hexSize) - ((hexSize * this.MAP_WIDTH) / 2), hexSize));
  }

  private strokeHex(hex: Hex, color: string = '#000000', lineWidth: number = 1) {
    const polygonCorners = this.layout.polygonCorners(hex);
    this.ctx.beginPath();
    this.ctx.moveTo(polygonCorners[0].x, polygonCorners[0].y);
    for (const Vec2d of polygonCorners) {
      this.ctx.lineTo(Vec2d.x, Vec2d.y);
    }
    this.ctx.lineTo(polygonCorners[0].x, polygonCorners[0].y);
    this.ctx.lineWidth = lineWidth;
    this.ctx.strokeStyle = color;
    this.ctx.stroke();
  }

  private fillHex(hex: Hex, color: string = '#000000') {
    const polygonCorners = this.layout.polygonCorners(hex);
    this.ctx.beginPath();
    this.ctx.moveTo(polygonCorners[0].x, polygonCorners[0].y);
    for (const Vec2d of polygonCorners) {
      this.ctx.lineTo(Vec2d.x, Vec2d.y);
    }
    this.ctx.lineTo(polygonCorners[0].x, polygonCorners[0].y);
    this.ctx.fillStyle = color;
    this.ctx.closePath();
    this.ctx.fill();
  }

  private strokeCircle(origin: Vec2D, radius: number, color: string = '#000000', lineWidth: number = 1) {
    this.ctx.lineWidth = lineWidth;
    this.ctx.strokeStyle = color;
    this.ctx.beginPath();
    this.ctx.arc(origin.x, origin.y, radius, 0, 2 * Math.PI);
    this.ctx.stroke();
  }

  private fillCircle(origin: Vec2D, radius: number, color: string = '#000000') {
    this.ctx.fillStyle = color;
    this.ctx.beginPath();
    this.ctx.arc(origin.x, origin.y, radius, 0, 2 * Math.PI);
    this.ctx.fill();
  }

  private findClosestEnemy(position: Hex, enemies: Enemy[]): Enemy {
    let minimumDistance = Number.MAX_VALUE;
    return enemies.reduce((minEnemy, enemy) => {
      const distance = position.euclideanDistance(enemy.position);
      if (distance < minimumDistance) {
        minimumDistance = distance;
        return enemy;
      }
      return minEnemy;
    }, undefined);
  }

  private findClosestHex(originHex: Hex, hexArr: Hex[]): Hex {
    let minimumDistance = Number.MAX_VALUE;
    return hexArr.reduce((minHex, hex) => {
      const distance = originHex.euclideanDistance(hex);
      if (distance < minimumDistance) {
        minimumDistance = distance;
        return hex;
      }
      return minHex;
    }, undefined);
  }
}
