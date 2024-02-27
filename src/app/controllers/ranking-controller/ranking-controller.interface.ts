import { Observable } from 'rxjs';

import { PlayerEntity } from '../../domain/entities/player.entity';

export abstract class IRankingController {
  abstract getRankingList(): Observable<PlayerEntity[]>;
}
