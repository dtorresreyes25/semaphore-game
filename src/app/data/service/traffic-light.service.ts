import { concat, first, interval, map, Observable, repeat } from 'rxjs';

import { ITrafficLight } from '../../domain/interfaces/traffic-light.interface';
import { TrafficLightIntervalsModel } from '../../domain/model/traffic-light-intervals.model';
import { TrafficLightState } from '../../domain/model/traffic-light-state.enum';

export class TrafficLightService implements ITrafficLight {
  private redLight$!: Observable<TrafficLightState>;
  private greenLight$!: Observable<TrafficLightState>;

  public starTimer(intervalsModel: TrafficLightIntervalsModel): Observable<TrafficLightState> {
    this.setLightDelays(intervalsModel.red, intervalsModel.green);
    return this.triggerLightSwitching();
  }

  private setLightDelays(redLightDelay: number, greenLightDelay: number): void {
    this.redLight$ = this.createTimer(redLightDelay, TrafficLightState.RED);
    this.greenLight$ = this.createTimer(greenLightDelay, TrafficLightState.GREEN);
  }

  private triggerLightSwitching(): Observable<TrafficLightState> {
    return concat(this.redLight$, this.greenLight$).pipe(repeat());
  }

  private createTimer(delay: number, state: TrafficLightState): Observable<TrafficLightState> {
    return interval(delay).pipe(
      map(() => state),
      first()
    );
  }
}
