import { Tower } from './Tower';
import { Hex } from '@hexagine/index';
import { Projectile } from './Projectile';
import { Enemy } from './Enemy';
import { Bomb } from './Bomb';

export class BombTower extends Tower {
  public readonly rateOfFire = 2;
  public readonly range = 6;

  constructor(position: Hex) {
    super(position, '../../assets/bombtower.png');
  }

  getProjectile(target: Enemy): Projectile {
    return new Bomb(this.position, target);
  }
}
