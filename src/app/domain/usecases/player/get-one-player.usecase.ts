import { Usecase } from '../../interfaces/usecase.interface';
import { PlayerEntity } from '../../entities/player.entity';
import { IPlayerRepository } from '../../interfaces/player-repository.interface';
import { Param } from '../../model/param.payload';
import { Observable } from 'rxjs';

export class GetOnePlayerUsecase implements Usecase<Param<string>, Observable<PlayerEntity>> {
  public constructor(private playerRepository: IPlayerRepository) {}

  public execute(playerName: Param<string>): Observable<PlayerEntity> {
    return this.playerRepository.get(playerName.payload);
  }
}
