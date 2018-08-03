import { GameObject } from './GameObject';
import { Projectile } from './Projectile';
import { Enemy } from './Enemy';
import { utc } from 'moment';

export abstract class Tower extends GameObject {
  public abstract readonly rateOfFire: number;
  public abstract readonly range: number;
  public lastFired = utc();

  public abstract getProjectile(target: Enemy): Projectile;
}
