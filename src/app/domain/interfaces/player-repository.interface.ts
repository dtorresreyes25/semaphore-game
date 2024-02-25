import { PlayerEntity } from '../entities/player.entity';
import { Observable } from 'rxjs';

export abstract class IPlayerRepository {
  abstract all(): Observable<PlayerEntity[]>;
  abstract get(name: string): Observable<PlayerEntity>;
  abstract update(player: PlayerEntity): Observable<PlayerEntity>;
  abstract create(player: PlayerEntity): Observable<PlayerEntity>;
}
