import { GameObject } from './GameObject';
import { Hex } from '@hexagine/index';
import { Enemy } from './Enemy';
import { IProjectile } from './IProjectile';

export class Bomb extends GameObject implements IProjectile {
    public readonly speed = 3;
    public readonly damage = 3;

    public direction: Hex;

    constructor(position: Hex, public target: Enemy) {
        super(position, '../../assets/bomb.png');

        const vector = target.position.subtract(position);
        this.direction = vector.normalize();
    }
}
