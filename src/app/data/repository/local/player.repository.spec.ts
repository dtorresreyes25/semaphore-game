import { SpectatorService } from '@ngneat/spectator';
import { createServiceFactory } from '@ngneat/spectator/jest';

import { PlayerEntity } from '../../../domain/entities/player.entity';
import { PlayerRepository } from './player.repository';

describe('PlayerRepository', () => {
  let spectator: SpectatorService<PlayerRepository>;
  const createService = createServiceFactory(PlayerRepository);

  beforeEach(() => {
    spectator = createService();
  });

  afterEach(() => {
    window.localStorage.clear();
  });

  it('should create the repository', () => {
    expect(spectator.service).toBeTruthy();
  });

  it('should get player by name', done => {
    const mockPlayer = { name: 'John Doe', score: 100, maxScore: 200 } as PlayerEntity;
    spectator.service.create(mockPlayer).subscribe(() => {
      spectator.service.get('John Doe').subscribe(result => {
        expect(result).toEqual(mockPlayer);
        done();
      });
    });
  });

  it('should return null when getting a player by a non-existent name', done => {
    spectator.service.get('Nonexistent Player').subscribe(result => {
      expect(result).toBeNull();
      done();
    });
  });

  it('should get all players', done => {
    const mockPlayers: PlayerEntity[] = [
      { name: 'Player 1', score: 50, maxScore: 100 } as PlayerEntity,
      { name: 'Player 2', score: 75, maxScore: 150 } as PlayerEntity,
    ];

    spectator.service.create(mockPlayers[0]).subscribe(() => {
      spectator.service.create(mockPlayers[1]).subscribe(() => {
        spectator.service.all().subscribe(result => {
          expect(result).toEqual(mockPlayers);
          done();
        });
      });
    });
  });

  it('should create a new player', done => {
    const mockPlayer = { name: 'New Player', score: 0, maxScore: 100 } as PlayerEntity;
    spectator.service.create(mockPlayer).subscribe(result => {
      expect(result).toEqual(mockPlayer);
      const savedPlayers = JSON.parse(window.localStorage.getItem('semaphore-game-players') || '[]');
      expect(savedPlayers).toEqual([mockPlayer]);

      done();
    });
  });

  it('should update an existing player', done => {
    const mockPlayer = { name: 'PlayerToUpdate', score: 50, maxScore: 100 } as PlayerEntity;
    spectator.service.create(mockPlayer).subscribe(() => {
      mockPlayer.score = 75;
      spectator.service.update(mockPlayer).subscribe(result => {
        expect(result).toEqual(mockPlayer);
        const savedPlayers = JSON.parse(window.localStorage.getItem('semaphore-game-players') || '[]');
        expect(savedPlayers).toEqual([mockPlayer]);

        done();
      });
    });
  });
});
