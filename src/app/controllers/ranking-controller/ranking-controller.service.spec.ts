import { SpectatorService } from '@ngneat/spectator';
import { createServiceFactory } from '@ngneat/spectator/jest';
import { of } from 'rxjs';

import { GetManyPlayersUsecase } from '../../domain/usecases/player/get-many-players/get-many-players.usecase';
import { RankingControllerService } from './ranking-controller.service';

describe('RankingControllerService', () => {
  let spectator: SpectatorService<RankingControllerService>;
  let getManyPlayersUsecase: GetManyPlayersUsecase;

  const mockPlayers = [
    { name: 'Player1', score: 100, maxScore: 150 },
    { name: 'Player2', score: 80, maxScore: 120 },
  ];

  getManyPlayersUsecase = {
    execute: jest.fn(() => of(mockPlayers)),
  } as unknown as GetManyPlayersUsecase;

  const createService = createServiceFactory({
    service: RankingControllerService,
    providers: [
      {
        provide: GetManyPlayersUsecase,
        useValue: getManyPlayersUsecase,
      },
    ],
  });

  beforeEach(() => {
    spectator = createService();
  });

  it('should create the service', () => {
    expect(spectator.service).toBeTruthy();
  });

  it('should get the ranking list', done => {
    spectator.service.getRankingList().subscribe(result => {
      const expectedSortedPlayers = mockPlayers.sort((a, b) => b.maxScore - a.maxScore).slice(0, 5);
      expect(result).toEqual(expectedSortedPlayers);
      done();
    });
  });
});
