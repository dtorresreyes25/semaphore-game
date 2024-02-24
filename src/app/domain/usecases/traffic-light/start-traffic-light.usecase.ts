import { Usecase } from '../../interfaces/usecase.interface';
import { Param } from '../../model/param.payload';
import { TrafficLightState } from '../../model/traffic-light-state.enum';
import { Observable } from 'rxjs';
import { ITrafficLight } from '../../interfaces/traffic-light.interface';

const RED_LIGHT_INTERVAL_IN_MILLISECONDS = 3000;

export class StartTrafficLightUsecase implements Usecase<Param<number>, Observable<TrafficLightState>> {
  public constructor(private trafficLight: ITrafficLight) {}

  public execute(score: Param<number>): Observable<TrafficLightState> {
    const greenLightInterval = this.calculateGreenLightInterval(score.payload);

    return this.trafficLight.starTimer({
      green: greenLightInterval,
      red: RED_LIGHT_INTERVAL_IN_MILLISECONDS,
    });
  }

  private calculateGreenLightInterval(score: number): number {
    return Math.max(10000 - score * 100, 2000) + this.getRandomVariation(-1500, 1500);
  }

  private getRandomVariation(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
