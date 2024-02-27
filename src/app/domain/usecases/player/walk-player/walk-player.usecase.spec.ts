import { SpectatorService } from '@ngneat/spectator';
import { createServiceFactory } from '@ngneat/spectator/jest';

import { PlayerEntity } from '../../../entities/player.entity';
import { SemaphoreState } from '../../../model/semaphore-state.enum';
import { StepModel } from '../../../model/step.model';
import { WalkPlayerUsecase } from './walk-player.usecase';

describe('WalkPlayerUsecase', () => {
  let spectator: SpectatorService<WalkPlayerUsecase>;
  const createService = createServiceFactory(WalkPlayerUsecase);

  beforeEach(() => {
    spectator = createService();
  });

  it('should reset player score when semaphore is red', () => {
    const player = new PlayerEntity('John Doe', 100, 200);
    const redSemaphoreState: SemaphoreState = SemaphoreState.RED;
    const updatedPlayer = spectator.service.execute({
      payload: { player, semaphoreState: redSemaphoreState, step: {} as StepModel },
    });
    expect(updatedPlayer.score).toBe(0);
  });

  it('should update player score by one when semaphore is green and steps are different', () => {
    const player = new PlayerEntity('John Doe', 100, 200);
    const greenSemaphoreState: SemaphoreState = SemaphoreState.GREEN;
    const currentStep = { foot: 'left' } as StepModel;
    const lastStep = { foot: 'right' } as StepModel;
    spectator.service['lastStep'] = lastStep;

    const updatedPlayer = spectator.service.execute({
      payload: { player, semaphoreState: greenSemaphoreState, step: currentStep },
    });
    expect(updatedPlayer.score).toBe(101);
  });

  it('should decrease player score by one when semaphore is green and steps are the same', () => {
    const player = new PlayerEntity('John Doe', 100, 200);
    const greenSemaphoreState: SemaphoreState = SemaphoreState.GREEN;
    const currentStep = { foot: 'right' } as StepModel;
    spectator.service['lastStep'] = currentStep;
    const updatedPlayer = spectator.service.execute({
      payload: { player, semaphoreState: greenSemaphoreState, step: currentStep },
    });
    expect(updatedPlayer.score).toBe(99);
  });
});
