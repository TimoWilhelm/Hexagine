import { Hex } from '@hexagine/index';
import { Enemy } from './Enemy';
import { Projectile } from './Projectile';

export class Bomb extends Projectile {
  public readonly speed = 3;
  public readonly damage = 3;
  public readonly areaOfEffectRange = 2;

  constructor(position: Hex, target: Enemy) {
    super(position, target, '../../assets/bomb.png');
  }
}
