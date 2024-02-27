import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { Observable, of } from 'rxjs';

import { PlayerEntity } from '../../../entities/player.entity';
import { IPlayerRepository } from '../../../interfaces/player-repository.interface';
import { Param } from '../../../model/param.payload';
import { CreatePlayerUsecase } from './create-player.usecase';

class MockPlayerRepository implements IPlayerRepository {
  create(player: PlayerEntity): Observable<PlayerEntity> {
    return of(player);
  }
  all(): Observable<PlayerEntity[]> {
    return of([]);
  }
  get(): Observable<PlayerEntity | null> {
    return of({} as PlayerEntity);
  }
  update(): Observable<PlayerEntity> {
    return of({} as PlayerEntity);
  }
}

describe('CreatePlayerUsecase', () => {
  let spectator: SpectatorService<CreatePlayerUsecase>;
  const mockPlayerRepository = new MockPlayerRepository();

  const createService = createServiceFactory({
    service: CreatePlayerUsecase,
    providers: [{ provide: IPlayerRepository, useValue: mockPlayerRepository }],
  });

  beforeEach(() => {
    spectator = createService();
  });

  it('should create a player successfully', done => {
    const playerData = {
      name: 'John Doe',
      score: 0,
      maxScore: 100,
    } as PlayerEntity;
    spectator.service.execute(new Param(playerData)).subscribe(result => {
      expect(result).toEqual(playerData);
      done();
    });
  });
});
