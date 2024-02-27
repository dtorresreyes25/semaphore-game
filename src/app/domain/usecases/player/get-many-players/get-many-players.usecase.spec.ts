import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { Observable, of } from 'rxjs';

import { PlayerEntity } from '../../../entities/player.entity';
import { IPlayerRepository } from '../../../interfaces/player-repository.interface';
import { GetManyPlayersUsecase } from './get-many-players.usecase';

class MockPlayerRepository implements IPlayerRepository {
  all(): Observable<PlayerEntity[]> {
    const players: PlayerEntity[] = [
      { name: 'John Doe', score: 100, maxScore: 200 } as PlayerEntity,
      { name: 'Jane Doe', score: 150, maxScore: 250 } as PlayerEntity,
    ];
    return of(players);
  }
  create = jest.fn();
  get = jest.fn();
  update = jest.fn();
}

describe('GetManyPlayersUsecase', () => {
  let spectator: SpectatorService<GetManyPlayersUsecase>;
  const mockPlayerRepository = new MockPlayerRepository();

  const createService = createServiceFactory({
    service: GetManyPlayersUsecase,
    providers: [{ provide: IPlayerRepository, useValue: mockPlayerRepository }],
  });

  beforeEach(() => {
    spectator = createService();
  });

  it('should get multiple players successfully', done => {
    spectator.service.execute().subscribe(result => {
      expect(Array.isArray(result)).toBeTruthy();
      expect(result.length).toEqual(2);
      expect(result[0]).toEqual({ name: 'John Doe', score: 100, maxScore: 200 });
      expect(result[1]).toEqual({ name: 'Jane Doe', score: 150, maxScore: 250 });
      done();
    });
  });
});
