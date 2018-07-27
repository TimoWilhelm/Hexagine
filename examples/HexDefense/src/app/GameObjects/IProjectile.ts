import { IMovable } from './IMovable';
import { Enemy } from './Enemy';

export interface IProjectile extends IMovable {
    damage: number;
    target: Enemy;
}
