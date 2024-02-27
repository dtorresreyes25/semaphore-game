import { concat, map, Observable, repeat, takeWhile, timer } from 'rxjs';

import { ISemaphore } from '../../domain/interfaces/semaphore.interface';
import { SemaphoreIntervalsModel } from '../../domain/model/semaphore-intervals.model';
import { SemaphoreState } from '../../domain/model/semaphore-state.enum';

export class SemaphoreService implements ISemaphore {
  private intervals!: SemaphoreIntervalsModel;

  public startTimer(): Observable<SemaphoreState> {
    const redTimer = this.createTimer(SemaphoreState.RED);
    const greenTimer = this.createTimer(SemaphoreState.GREEN);
    return concat(redTimer, greenTimer).pipe(repeat());
  }

  public refreshIntervals(intervals: SemaphoreIntervalsModel): void {
    this.intervals = intervals;
  }

  private createTimer(semaphoreState: SemaphoreState): Observable<SemaphoreState> {
    return timer(0, 1000).pipe(
      takeWhile((time: number) => time < this.intervals[semaphoreState] / 1000),
      map(() => semaphoreState)
    );
  }
}
