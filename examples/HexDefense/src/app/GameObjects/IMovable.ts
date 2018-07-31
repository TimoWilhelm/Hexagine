import { Hex } from '@hexagine/index';
import { GameObject } from './GameObject';

export interface IMovable extends GameObject {
  direction: Hex;
  speed: number;
}
