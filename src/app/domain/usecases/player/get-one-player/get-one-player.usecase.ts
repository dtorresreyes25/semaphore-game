import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { PlayerEntity } from '../../../entities/player.entity';
import { IPlayerRepository } from '../../../interfaces/player-repository.interface';
import { Usecase } from '../../../interfaces/usecase.interface';
import { Param } from '../../../model/param.payload';

@Injectable({ providedIn: 'root' })
export class GetOnePlayerUsecase implements Usecase<Param<string>, Observable<PlayerEntity | null>> {
  public constructor(private playerRepository: IPlayerRepository) {}

  public execute(playerName: Param<string>): Observable<PlayerEntity | null> {
    return this.playerRepository.get(playerName.payload);
  }
}
