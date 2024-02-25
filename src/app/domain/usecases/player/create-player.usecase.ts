import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { PlayerEntity } from '../../entities/player.entity';
import { IPlayerRepository } from '../../interfaces/player-repository.interface';
import { Usecase } from '../../interfaces/usecase.interface';
import { Param } from '../../model/param.payload';

@Injectable({ providedIn: 'root' })
export class CreatePlayerUsecase implements Usecase<Param<PlayerEntity>, Observable<PlayerEntity>> {
  public constructor(private playerRepository: IPlayerRepository) {}

  public execute(player: Param<PlayerEntity>): Observable<PlayerEntity> {
    return this.playerRepository.create(player.payload);
  }
}
