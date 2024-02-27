import { createServiceFactory, SpectatorService } from '@ngneat/spectator';

import { SemaphoreIntervalsModel } from '../../domain/model/semaphore-intervals.model';
import { SemaphoreState } from '../../domain/model/semaphore-state.enum';
import { SemaphoreService } from './semaphore.service';

describe('SemaphoreService', () => {
  let spectator: SpectatorService<SemaphoreService>;

  const createService = createServiceFactory({
    service: SemaphoreService,
  });

  beforeEach(() => {
    spectator = createService();
  });

  it('should be created', () => {
    expect(spectator.service).toBeTruthy();
  });

  it('should refresh intervals', () => {
    const intervals: SemaphoreIntervalsModel = {
      [SemaphoreState.RED]: 3000,
      [SemaphoreState.GREEN]: 2000,
    };

    spectator.service.refreshIntervals(intervals);

    expect(spectator.service['intervals']).toEqual(intervals);
  });

  it('should create timer and emit RED state', done => {
    const intervals: SemaphoreIntervalsModel = {
      [SemaphoreState.RED]: 3000,
      [SemaphoreState.GREEN]: 2000,
    };

    spectator.service.refreshIntervals(intervals);

    const expectedStates = [SemaphoreState.RED];
    let index = 0;

    spectator.service['createTimer'](SemaphoreState.RED).subscribe(state => {
      expect(state).toBe(expectedStates[index]);
      index++;

      if (index === expectedStates.length) {
        done();
      }
    });
  });

  it('should create timer and emit GREEN state', done => {
    const intervals: SemaphoreIntervalsModel = {
      [SemaphoreState.RED]: 3000,
      [SemaphoreState.GREEN]: 2000,
    };

    spectator.service.refreshIntervals(intervals);

    const expectedStates = [SemaphoreState.GREEN];
    let index = 0;

    spectator.service['createTimer'](SemaphoreState.GREEN).subscribe(state => {
      expect(state).toBe(expectedStates[index]);
      index++;

      if (index === expectedStates.length) {
        done();
      }
    });
  });
});
