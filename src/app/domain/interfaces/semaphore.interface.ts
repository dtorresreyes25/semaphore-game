import { Observable } from 'rxjs';

import { SemaphoreIntervalsModel } from '../model/semaphore-intervals.model';
import { SemaphoreState } from '../model/semaphore-state.enum';

export abstract class ISemaphore {
  abstract startTimer(): Observable<SemaphoreState>;
  abstract refreshIntervals(intervals: SemaphoreIntervalsModel): void;
}
