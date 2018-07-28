import { IMovable } from './IMovable';
import { Enemy } from './Enemy';

export interface IProjectile extends IMovable {
    readonly damage: number;
    readonly target: Enemy;
    readonly areaOfEffectRange: number;
}
