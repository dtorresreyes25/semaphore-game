import { Usecase } from '../../interfaces/usecase.interface';
import { PlayerEntity } from '../../entities/player.entity';
import { IPlayerRepository } from '../../interfaces/player-repository.interface';
import { Param } from '../../model/param.payload';

export class SavePlayerUsecase implements Usecase<Param<PlayerEntity>, void> {
  public constructor(private playerRepository: IPlayerRepository) {}

  public execute(player: Param<PlayerEntity>): void {
    return this.playerRepository.save(player.payload);
  }
}
