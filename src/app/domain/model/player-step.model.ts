import { TrafficLightState } from './traffic-light-state.enum';
import { StepModel } from './step.model';
import { PlayerEntity } from '../entities/player.entity';

export class PlayerStepModel {
  public step!: StepModel;
  public player!: PlayerEntity;
  public trafficLightState!: TrafficLightState;
}
