import { TrafficLightState } from '../model/traffic-light-state.enum';
import { TrafficLightIntervalsModel } from '../model/traffic-light-intervals.model';
import { Observable } from 'rxjs';

export abstract class ITrafficLight {
  abstract starTimer(intervals: TrafficLightIntervalsModel): Observable<TrafficLightState>;
}
