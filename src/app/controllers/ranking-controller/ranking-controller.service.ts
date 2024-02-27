import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { PlayerEntity } from '../../domain/entities/player.entity';
import { GetManyPlayersUsecase } from '../../domain/usecases/player/get-many-players/get-many-players.usecase';
import { IRankingController } from './ranking-controller.interface';

@Injectable()
export class RankingControllerService implements IRankingController {
  constructor(private getManyPlayersUsecase: GetManyPlayersUsecase) {}

  public getRankingList(): Observable<PlayerEntity[]> {
    return this.getManyPlayersUsecase.execute().pipe(
      map(players => {
        const sortedPlayers = players.sort((a, b) => b.maxScore - a.maxScore);
        return sortedPlayers.slice(0, 5);
      })
    );
  }
}
