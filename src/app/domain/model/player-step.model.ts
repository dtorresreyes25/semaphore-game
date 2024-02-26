import { PlayerEntity } from '../entities/player.entity';
import { SemaphoreState } from './semaphore-state.enum';
import { StepModel } from './step.model';

export class PlayerStepModel {
  public constructor(
    public step: StepModel,
    public player: PlayerEntity,
    public semaphoreState: SemaphoreState
  ) {}
}
