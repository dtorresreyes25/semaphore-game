import { createServiceFactory, SpectatorService } from '@ngneat/spectator';

import { MusicService } from './music.service';

describe('MusicService', () => {
  let spectator: SpectatorService<MusicService>;

  const createService = createServiceFactory({
    service: MusicService,
  });

  beforeEach(() => {
    spectator = createService();
  });

  it('should be created', () => {
    expect(spectator).toBeTruthy();
  });

  it('should play background music', () => {
    const playSpy = jest.spyOn(spectator.service['backgroundMusic'], 'play');
    spectator.service.playBackgroundMusic();
    expect(playSpy).toHaveBeenCalled();
  });

  it('should pause background music', () => {
    const pauseSpy = jest.spyOn(spectator.service['backgroundMusic'], 'pause');
    spectator.service.pauseBackgroundMusic();
    expect(pauseSpy).toHaveBeenCalled();
  });

  it('should play error sound', () => {
    const playSpy = jest.spyOn(spectator.service['errorSound'], 'play');
    spectator.service.playErrorSound();
    expect(playSpy).toHaveBeenCalled();
  });

  it('should calculate playback rate', () => {
    const adjustedGreenDuration = 5000;
    const expectedRate = 1.05;
    const calculatedRate = spectator.service['calculatePlaybackRate'](adjustedGreenDuration);
    expect(calculatedRate).toBe(expectedRate);
  });

  it('should set playback rate', () => {
    const greenSemaphoreDuration = 5000;
    const rateSpy = jest.spyOn(spectator.service['backgroundMusic'], 'rate');
    spectator.service.setPlaybackRate(greenSemaphoreDuration);
    expect(rateSpy).toHaveBeenCalledWith(expect.any(Number));
  });
});
