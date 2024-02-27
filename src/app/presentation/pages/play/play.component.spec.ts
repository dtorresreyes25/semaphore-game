import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { NavigationEnd, Router } from '@angular/router';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { MockModule } from 'ng-mocks';
import { of } from 'rxjs';

import { IPlayController } from '../../../controllers/play-controller/play-controller.interface';
import { PlayerEntity } from '../../../domain/entities/player.entity';
import { FootSide } from '../../../domain/model/foot-side.enum';
import { SemaphoreState } from '../../../domain/model/semaphore-state.enum';
import { StepModel } from '../../../domain/model/step.model';
import { SharedModule } from '../../shared/shared.module';
import { PlayComponent } from './play.component';

describe('PlayComponent', () => {
  let spectator: Spectator<PlayComponent>;

  const player = { name: 'TestPlayer', score: 0, maxScore: 100 } as PlayerEntity;

  const mockRouter = {
    navigate: jest.fn(),
    events: of(new NavigationEnd(1, 'test', 'test')),
    getCurrentNavigation: jest.fn(() => ({ extras: { state: { player } } })),
  };

  const mockPlayController: Partial<IPlayController> = {
    startSemaphore: jest.fn(() => of(SemaphoreState.GREEN)),
    startGame: jest.fn(),
    walkPlayer: jest.fn(),
    savePlayer: jest.fn(),
    pauseBackgroundMusic: jest.fn(),
  };

  const createComponent = createComponentFactory({
    component: PlayComponent,
    providers: [
      { provide: IPlayController, useValue: mockPlayController },
      { provide: Router, useValue: mockRouter },
    ],
    imports: [MockModule(SharedModule), MockModule(MatCardModule), MockModule(MatIconModule)],
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should initialize player, headerProps, and semaphoreLight', () => {
    spectator.component.ngOnInit();
    expect(spectator.component.player).toEqual(player);
    expect(spectator.component.headerProps).toBeDefined();
    expect(spectator.component.semaphoreLight).toEqual(SemaphoreState.GREEN);
  });

  it('should start semaphore and game on initialization', () => {
    spectator.component.ngOnInit();
    expect(mockPlayController.startSemaphore).toHaveBeenCalled();
    expect(mockPlayController.startGame).toHaveBeenCalledWith(spectator.component.player);
  });

  it('should handle step change', () => {
    const stepModel = { foot: FootSide.LEFT } as StepModel;

    const playerStepModel = {
      step: {
        foot: 'left',
      },
      player: {
        name: 'TestPlayer',
        score: 0,
        maxScore: 100,
      },
      semaphoreState: 'green',
    };
    spectator.component.handleStepChanged(stepModel);
    expect(mockPlayController.walkPlayer).toHaveBeenCalledWith(playerStepModel);
    expect(mockPlayController.savePlayer).toHaveBeenCalledWith(spectator.component.player);
  });

  it('should navigate to home and pause background music', () => {
    spectator.component['navigateHome']();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/home']);
    expect(mockPlayController.pauseBackgroundMusic).toHaveBeenCalled();
  });

  it('should set headerProps with playerName', () => {
    spectator.component.setHeaderProps();
    expect(spectator.component.headerProps).toBeDefined();
    expect(spectator.component.headerProps.playerName).toEqual(spectator.component.player?.name);
  });
});
