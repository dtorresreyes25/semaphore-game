import { Usecase } from '../../interfaces/usecase.interface';
import { Param } from '../../model/param.payload';
import { StepModel } from '../../model/step.model';
import { PlayerStepModel } from '../../model/player-step.model';
import { PlayerEntity } from '../../entities/player.entity';
import { TrafficLightState } from '../../model/traffic-light-state.enum';

export class WalkPlayerUsecase implements Usecase<Param<PlayerStepModel>, PlayerEntity> {
  private lastStep!: StepModel;

  public execute({ payload }: Param<PlayerStepModel>): PlayerEntity {
    const { step, player } = payload;

    this.updatePlayerScoreByTrafficLightState(payload);
    this.rememberStep(step);

    return player;
  }

  private updatePlayerScoreByTrafficLightState(payload: PlayerStepModel): void {
    const operations = this.getOperationListByTrafficLightState();
    const operationByTrafficLightState = operations.get(payload.trafficLightState);

    operationByTrafficLightState?.(payload);
  }

  private getOperationListByTrafficLightState(): Map<TrafficLightState, (payload: PlayerStepModel) => void> {
    return new Map([
      [TrafficLightState.RED, this.resetScore],
      [TrafficLightState.GREEN, this.updateScoreByOne],
    ]);
  }

  private resetScore({ player }: PlayerStepModel): void {
    player.resetAllScore();
  }

  private updateScoreByOne({ player, step }: PlayerStepModel): void {
    this.isCurrentStepEqualToLastOne(step) ? player.decreaseScoreByOne() : player.increaseScoreByOne();
  }

  private isCurrentStepEqualToLastOne(step: StepModel): boolean {
    return step.foot === this.lastStep.foot;
  }

  private rememberStep(step: StepModel): void {
    this.lastStep = step;
  }
}
