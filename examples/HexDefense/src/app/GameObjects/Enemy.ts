import { GameObject } from './GameObject';
import { IMovable } from './IMovable';
import { Hex } from '@hexagine/index';

export class Enemy extends GameObject implements IMovable {
    public readonly speed = 2;
    public readonly MAX_HEALTH = 3;
    public readonly BOUNTY = 10;

    public health = this.MAX_HEALTH;
    public direction = new Hex(1, -1, 0);

    constructor(position: Hex) {
        super(position, '../../assets/alien.png');
    }
}
