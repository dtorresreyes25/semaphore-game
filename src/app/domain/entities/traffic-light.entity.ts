import { TrafficLightState } from '../model/traffic-light-state.enum';

export class TrafficLightEntity {
  public state = TrafficLightState.RED;

  public toggle(): void {
    this.state = this.state === TrafficLightState.RED ? TrafficLightState.GREEN : TrafficLightState.RED;
  }
}
