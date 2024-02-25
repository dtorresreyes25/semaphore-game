import { Observable } from 'rxjs';

import { TrafficLightIntervalsModel } from '../model/traffic-light-intervals.model';
import { TrafficLightState } from '../model/traffic-light-state.enum';

export abstract class ITrafficLight {
  abstract starTimer(intervals: TrafficLightIntervalsModel): Observable<TrafficLightState>;
}
