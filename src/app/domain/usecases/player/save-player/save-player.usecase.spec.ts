import { SpectatorService } from '@ngneat/spectator';
import { createServiceFactory } from '@ngneat/spectator/jest';
import { Observable, of } from 'rxjs';

import { PlayerEntity } from '../../../entities/player.entity';
import { IPlayerRepository } from '../../../interfaces/player-repository.interface';
import { SavePlayerUsecase } from './save-player.usecase';

class MockPlayerRepository implements IPlayerRepository {
  update(player: PlayerEntity): Observable<PlayerEntity> {
    return of({ ...player, score: player.score + 10 } as PlayerEntity);
  }
  all = jest.fn();
  create = jest.fn();
  get = jest.fn();
}

describe('SavePlayerUsecase', () => {
  let spectator: SpectatorService<SavePlayerUsecase>;
  const mockPlayerRepository = new MockPlayerRepository();

  const createService = createServiceFactory({
    service: SavePlayerUsecase,
    providers: [{ provide: IPlayerRepository, useValue: mockPlayerRepository }],
  });

  beforeEach(() => {
    spectator = createService();
  });

  it('should save player successfully', done => {
    const player = { name: 'John Doe', score: 100, maxScore: 200 } as PlayerEntity;

    spectator.service.execute({ payload: player }).subscribe(result => {
      expect(result).toEqual({ name: 'John Doe', score: 110, maxScore: 200 });
      done();
    });
  });
});
