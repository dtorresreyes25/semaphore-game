import { SpectatorService } from '@ngneat/spectator';
import { createServiceFactory } from '@ngneat/spectator/jest';
import { Observable, of } from 'rxjs';

import { PlayerEntity } from '../../../entities/player.entity';
import { IPlayerRepository } from '../../../interfaces/player-repository.interface';
import { GetOnePlayerUsecase } from './get-one-player.usecase';

class MockPlayerRepository implements IPlayerRepository {
  get(): Observable<PlayerEntity | null> {
    const player = { name: 'John Doe', score: 100, maxScore: 200 } as PlayerEntity;
    return of(player);
  }
  all = jest.fn();
  create = jest.fn();
  update = jest.fn();
}
describe('GetOnePlayerUsecase', () => {
  let spectator: SpectatorService<GetOnePlayerUsecase>;
  const mockPlayerRepository = new MockPlayerRepository();

  const createService = createServiceFactory({
    service: GetOnePlayerUsecase,
    providers: [{ provide: IPlayerRepository, useValue: mockPlayerRepository }],
  });

  beforeEach(() => {
    spectator = createService();
  });

  it('should get a single player successfully', done => {
    spectator.service.execute({ payload: 'John Doe' }).subscribe(result => {
      expect(result).toEqual({ name: 'John Doe', score: 100, maxScore: 200 });
      done();
    });
  });

  it('should handle the case where the player does not exist', done => {
    mockPlayerRepository.get = jest.fn(() => of(null));
    spectator.service.execute({ payload: 'Nonexistent Player' }).subscribe(result => {
      expect(result).toBeNull();
      done();
    });
  });
});
