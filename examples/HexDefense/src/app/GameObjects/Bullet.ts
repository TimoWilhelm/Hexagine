import { Hex } from '@hexagine/index';
import { Enemy } from './Enemy';
import { Projectile } from './Projectile';

export class Bullet extends Projectile {
  public readonly speed = 10;
  public readonly damage = 1;
  public readonly areaOfEffectRange = 0;

  constructor(position: Hex, target: Enemy) {
    super(position, target, '../../assets/bullet.png') ;
  }
}
