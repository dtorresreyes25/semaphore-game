import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { MusicService } from './music.service';

describe('MusicService', () => {
  let spectator: SpectatorService<MusicService>;
  const createService = createServiceFactory(MusicService);

  beforeEach(() => spectator = createService());

  it('should...', () => {
    expect(spectator.service).toBeTruthy();
  });
});