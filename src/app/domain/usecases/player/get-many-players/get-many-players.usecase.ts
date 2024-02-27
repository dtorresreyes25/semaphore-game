import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { PlayerEntity } from '../../../entities/player.entity';
import { IPlayerRepository } from '../../../interfaces/player-repository.interface';
import { Usecase } from '../../../interfaces/usecase.interface';

@Injectable({ providedIn: 'root' })
export class GetManyPlayersUsecase implements Usecase<void, Observable<PlayerEntity[]>> {
  public constructor(private playerRepository: IPlayerRepository) {}

  public execute(): Observable<PlayerEntity[]> {
    return this.playerRepository.all();
  }
}
