import { Injectable } from '@angular/core';

import { PlayerEntity } from '../../entities/player.entity';
import { Usecase } from '../../interfaces/usecase.interface';
import { Param } from '../../model/param.payload';
import { PlayerStepModel } from '../../model/player-step.model';
import { SemaphoreState } from '../../model/semaphore-state.enum';
import { StepModel } from '../../model/step.model';

@Injectable()
export class WalkPlayerUsecase implements Usecase<Param<PlayerStepModel>, PlayerEntity> {
  private lastStep!: StepModel;

  public execute = ({ payload }: Param<PlayerStepModel>): PlayerEntity => {
    const { step, player } = payload;

    this.updatePlayerScoreBySemaphoreState(payload);
    this.rememberStep(step);

    return player;
  };

  private updatePlayerScoreBySemaphoreState = (payload: PlayerStepModel): void => {
    const operations = this.getOperationListByTrafficLightState();
    const operationBySemaphoreState = operations.get(payload.semaphoreState);

    operationBySemaphoreState?.(payload);
  };

  private getOperationListByTrafficLightState(): Map<SemaphoreState, (payload: PlayerStepModel) => void> {
    return new Map([
      [SemaphoreState.RED, this.resetScore],
      [SemaphoreState.GREEN, this.updateScoreByOne],
    ]);
  }

  private resetScore = ({ player }: PlayerStepModel): void => {
    if (player.score) {
      player.resetAllScore();
    }
  };

  private updateScoreByOne = ({ player, step }: PlayerStepModel): void => {
    this.isCurrentStepEqualToLastOne(step) ? player.decreaseScoreByOne() : player.increaseScoreByOne();
  };

  private isCurrentStepEqualToLastOne = (step: StepModel): boolean => {
    return step.foot === this.lastStep?.foot;
  };

  private rememberStep(step: StepModel): void {
    this.lastStep = step;
  }
}
