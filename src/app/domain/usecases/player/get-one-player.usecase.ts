import { Usecase } from '../../interfaces/usecase.interface';
import { PlayerEntity } from '../../entities/player.entity';
import { IPlayerRepository } from '../../interfaces/player-repository.interface';
import { Param } from '../../model/param.payload';

export class GetOnePlayerUsecase implements Usecase<Param<string>, PlayerEntity> {
  public constructor(private playerRepository: IPlayerRepository) {}

  public execute(playerName: Param<string>): PlayerEntity {
    return this.playerRepository.get(playerName.payload);
  }
}
