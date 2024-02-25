import { Observable } from 'rxjs';

import { PlayerEntity } from '../entities/player.entity';

export abstract class IPlayerRepository {
  abstract all(): Observable<PlayerEntity[]>;
  abstract get(name: string): Observable<PlayerEntity | null>;
  abstract update(player: PlayerEntity): Observable<PlayerEntity>;
  abstract create(player: PlayerEntity): Observable<PlayerEntity>;
}
