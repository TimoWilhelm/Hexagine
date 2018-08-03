import { Hex } from '@hexagine/index';
import { IMovable } from './IMovable';
import { Enemy } from './Enemy';
import { GameObject } from './GameObject';

export abstract class Projectile extends GameObject implements IMovable {
  public abstract readonly damage: number;
  public abstract readonly areaOfEffectRange: number;
  public abstract readonly speed: number;
  public direction: any;

  constructor(position: Hex, public target: Enemy, spriteSource: string) {
    super(position, spriteSource);
    const vector = target.position.subtract(position);
    this.direction = vector.normalize();
  }
}
