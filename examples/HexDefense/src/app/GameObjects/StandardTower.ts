import { Tower } from './Tower';
import { Hex } from '@hexagine/index';
import { Projectile } from './Projectile';
import { Enemy } from './Enemy';
import { Bullet } from './Bullet';

export class StandardTower extends Tower {
  public readonly rateOfFire = 0.5;
  public readonly range = 3;

  constructor(position: Hex) {
    super(position, '../../assets/standardtower.png');
  }

  getProjectile(target: Enemy): Projectile {
    return new Bullet(this.position, target);
  }
}
