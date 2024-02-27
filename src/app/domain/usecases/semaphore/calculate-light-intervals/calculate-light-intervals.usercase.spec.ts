import { createServiceFactory, SpectatorService } from '@ngneat/spectator';

import { CalculateLightIntervalsUsecase } from './calculate-light-intervals.usecase';

describe('CalculateLightIntervalsUsecase', () => {
  let spectator: SpectatorService<CalculateLightIntervalsUsecase>;

  const createService = createServiceFactory(CalculateLightIntervalsUsecase);

  beforeEach(() => {
    spectator = createService();
  });

  it('should calculate green light interval based on the score', () => {
    const score = { payload: 5 };
    spectator.service['random'] = () => 1300;
    const expectedGreenInterval =
      Math.max(10000 - score.payload * 100, 2000) + spectator.service['random'](-1500, 1500);
    const result = spectator.service.execute(score);
    expect(result.green).toEqual(expectedGreenInterval);
  });

  it('should have a fixed red light interval of 3000 milliseconds', () => {
    const score = { payload: 5 };
    const result = spectator.service.execute(score);
    expect(result.red).toEqual(3000);
  });
});
