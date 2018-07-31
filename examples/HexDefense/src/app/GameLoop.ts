import { animationFrameScheduler, interval, Subscription } from 'rxjs';

export abstract class GameLoop {

  private drawSub: Subscription;
  private updateSub: Subscription;

  protected startLoop() {
    this.drawSub = interval(0, animationFrameScheduler)
      .subscribe((frame: number) => this.draw(frame));
    this.updateSub = interval(33.33)
      .subscribe((updateTick: number) => this.update(updateTick));
  }

  protected stopLoop() {
    this.updateSub.unsubscribe();
    this.drawSub.unsubscribe();
  }

  public abstract draw(frame: number);
  public abstract update(updateTick: number);
}
