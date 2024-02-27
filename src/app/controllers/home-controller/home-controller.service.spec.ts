import { Router } from '@angular/router';
import { SpectatorService } from '@ngneat/spectator';
import { createServiceFactory } from '@ngneat/spectator/jest';
import { of } from 'rxjs';

import { PlayerEntity } from '../../domain/entities/player.entity';
import { CreatePlayerUsecase } from '../../domain/usecases/player/create-player/create-player.usecase';
import { GetOnePlayerUsecase } from '../../domain/usecases/player/get-one-player/get-one-player.usecase';
import { HomeControllerService } from './home-controller.service';

describe('HomeControllerService', () => {
  let spectator: SpectatorService<HomeControllerService>;
  let router: Router;
  let createPlayerUsecase: CreatePlayerUsecase;
  let getOnePlayerUsecase: GetOnePlayerUsecase;

  const createService = createServiceFactory({
    service: HomeControllerService,
    providers: [
      { provide: Router, useValue: { navigateByUrl: jest.fn() } },
      { provide: CreatePlayerUsecase, useValue: { execute: jest.fn() } },
      { provide: GetOnePlayerUsecase, useValue: { execute: jest.fn() } },
    ],
  });

  beforeEach(() => {
    spectator = createService();

    router = spectator.inject(Router);
    createPlayerUsecase = spectator.inject(CreatePlayerUsecase);
    getOnePlayerUsecase = spectator.inject(GetOnePlayerUsecase);
  });

  it('should create the service', () => {
    expect(spectator.service).toBeTruthy();
  });

  it('should navigate to play when a player is found', () => {
    const playerName = 'John Doe';
    const playerEntity = new PlayerEntity(playerName);

    jest.spyOn(getOnePlayerUsecase, 'execute').mockReturnValue(of(playerEntity));

    spectator.service.joinPlayer(playerName);

    expect(getOnePlayerUsecase.execute).toHaveBeenCalledWith({ payload: playerName });
    expect(router.navigateByUrl).toHaveBeenCalledWith('play', { state: { player: playerEntity } });
  });

  it('should create a new player and navigate to play', () => {
    const playerName = 'Jane Doe';
    const newPlayerEntity = new PlayerEntity(playerName);

    jest.spyOn(getOnePlayerUsecase, 'execute').mockReturnValue(of(null));
    jest.spyOn(createPlayerUsecase, 'execute').mockReturnValue(of(newPlayerEntity));

    spectator.service.joinPlayer(playerName);

    expect(getOnePlayerUsecase.execute).toHaveBeenCalledWith({ payload: playerName });
    expect(createPlayerUsecase.execute).toHaveBeenCalledWith({ payload: newPlayerEntity });
    expect(router.navigateByUrl).toHaveBeenCalledWith('play', { state: { player: newPlayerEntity } });
  });
});
