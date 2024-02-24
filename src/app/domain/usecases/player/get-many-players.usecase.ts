import { Usecase } from '../../interfaces/usecase.interface';
import { PlayerEntity } from '../../entities/player.entity';
import { IPlayerRepository } from '../../interfaces/player-repository.interface';

export class GetManyPlayersUsecase implements Usecase<void, PlayerEntity[]> {
  public constructor(private playerRepository: IPlayerRepository) {}

  public execute(): PlayerEntity[] {
    return this.playerRepository.all();
  }
}
