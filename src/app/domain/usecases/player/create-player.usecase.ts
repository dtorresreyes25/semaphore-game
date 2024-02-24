import { Usecase } from '../../interfaces/usecase.interface';
import { PlayerEntity } from '../../entities/player.entity';
import { IPlayerRepository } from '../../interfaces/player-repository.interface';
import { Param } from '../../model/param.payload';

export class CreatePlayerUsecase implements Usecase<Param<PlayerEntity>, PlayerEntity> {
  public constructor(private playerRepository: IPlayerRepository) {}

  public execute(player: Param<PlayerEntity>): PlayerEntity {
    return this.playerRepository.create(player.payload);
  }
}
