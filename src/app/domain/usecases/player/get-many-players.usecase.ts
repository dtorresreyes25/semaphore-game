import { Usecase } from '../../interfaces/usecase.interface';
import { PlayerEntity } from '../../entities/player.entity';
import { IPlayerRepository } from '../../interfaces/player-repository.interface';
import { Observable } from 'rxjs';

export class GetManyPlayersUsecase implements Usecase<void, Observable<PlayerEntity[]>> {
  public constructor(private playerRepository: IPlayerRepository) {}

  public execute(): Observable<PlayerEntity[]> {
    return this.playerRepository.all();
  }
}
