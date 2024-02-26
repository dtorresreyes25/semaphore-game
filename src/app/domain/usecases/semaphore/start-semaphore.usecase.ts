import { Usecase } from '../../interfaces/usecase.interface';
import { Param } from '../../model/param.payload';
import { SemaphoreIntervalsModel } from '../../model/semaphore-intervals.model';

const RED_LIGHT_INTERVAL_IN_MILLISECONDS = 3000;

export class StartSemaphoreUsecase implements Usecase<Param<number>, SemaphoreIntervalsModel> {
  public execute(score: Param<number>): SemaphoreIntervalsModel {
    return this.getSemaphoreIntervals(score.payload);
  }

  private getSemaphoreIntervals(score: number): SemaphoreIntervalsModel {
    return { green: this.calculateGreenLightInterval(score), red: RED_LIGHT_INTERVAL_IN_MILLISECONDS };
  }

  private calculateGreenLightInterval(score: number): number {
    return Math.max(10000 - score * 100, 2000) + this.random(-1500, 1500);
  }

  private random(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }
}
