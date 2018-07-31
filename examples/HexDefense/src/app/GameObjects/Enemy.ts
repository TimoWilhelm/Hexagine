import { GameObject } from './GameObject';
import { IMovable } from './IMovable';
import { Hex } from '@hexagine/index';

export class Enemy extends GameObject implements IMovable {
  public readonly speed = 2;
  public readonly maxHealth = 3;
  public readonly bounty = 10;

  public health = this.maxHealth;
  public direction = new Hex(1, -1, 0);

  constructor(position: Hex) {
    super(position, '../../assets/alien.png');
  }
}
