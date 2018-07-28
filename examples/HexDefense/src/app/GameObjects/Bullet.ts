import { GameObject } from './GameObject';
import { Hex } from '@hexagine/index';
import { Enemy } from './Enemy';
import { IProjectile } from './IProjectile';

export class Bullet extends GameObject implements IProjectile {
    public readonly speed = 10;
    public readonly damage = 1;
    public readonly areaOfEffectRange = 0;

    public direction: Hex;

    constructor(position: Hex, public target: Enemy) {
        super(position, '../../assets/bullet.png');

        const vector = target.position.subtract(position);
        this.direction = vector.normalize();
    }
}
