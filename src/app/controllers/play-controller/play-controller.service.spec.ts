import { SpectatorService } from '@ngneat/spectator';
import { createServiceFactory } from '@ngneat/spectator/jest';
import { of } from 'rxjs';

import { ISemaphore } from '../../domain/interfaces/semaphore.interface';
import { SavePlayerUsecase } from '../../domain/usecases/player/save-player/save-player.usecase';
import { WalkPlayerUsecase } from '../../domain/usecases/player/walk-player/walk-player.usecase';
import { CalculateLightIntervalsUsecase } from '../../domain/usecases/semaphore/calculate-light-intervals/calculate-light-intervals.usecase';
import { MusicService } from '../../services/music/music.service';
import { PlayControllerService } from './play-controller.service';

describe('PlayControllerService', () => {
  let spectator: SpectatorService<PlayControllerService>;
  let semaphoreService: ISemaphore;
  let savePlayerUsecase: SavePlayerUsecase;
  let walkPlayerUsecase: WalkPlayerUsecase;
  let startSemaphoreUsecase: CalculateLightIntervalsUsecase;
  let musicService: MusicService;

  semaphoreService = {
    startTimer: () => of(),
    refreshIntervals: jest.fn(),
  } as unknown as ISemaphore;

  savePlayerUsecase = {
    execute: jest.fn(),
  } as unknown as SavePlayerUsecase;

  walkPlayerUsecase = {
    execute: jest.fn(),
  } as unknown as WalkPlayerUsecase;

  startSemaphoreUsecase = {
    execute: jest.fn(),
  } as unknown as CalculateLightIntervalsUsecase;

  musicService = {
    setPlaybackRate: jest.fn(),
    playBackgroundMusic: jest.fn(),
    pauseBackgroundMusic: jest.fn(),
    playErrorSound: jest.fn(),
  } as unknown as MusicService;

  const createService = createServiceFactory({
    service: PlayControllerService,
    providers: [
      { provide: ISemaphore, useValue: semaphoreService },
      { provide: SavePlayerUsecase, useValue: savePlayerUsecase },
      { provide: WalkPlayerUsecase, useValue: walkPlayerUsecase },
      { provide: CalculateLightIntervalsUsecase, useValue: startSemaphoreUsecase },
      { provide: MusicService, useValue: musicService },
    ],
  });

  beforeEach(() => {
    spectator = createService();
  });

  it('should create the service', () => {
    expect(spectator.service).toBeTruthy();
  });

  it('should pause background music', () => {
    const pauseBackgroundMusicSpy = jest.spyOn(musicService, 'pauseBackgroundMusic');
    spectator.service.pauseBackgroundMusic();
    expect(pauseBackgroundMusicSpy).toHaveBeenCalled();
  });

  it('should play background music', () => {
    const playBackgroundMusicSpy = jest.spyOn(musicService, 'playBackgroundMusic');
    spectator.service['playBackgroundMusic']();

    expect(playBackgroundMusicSpy).toHaveBeenCalled();
  });

  it('should save the player', () => {
    const executeSpy = jest.spyOn(savePlayerUsecase, 'execute');
    spectator.service.savePlayer({} as any);

    expect(executeSpy).toHaveBeenCalled();
  });
});
