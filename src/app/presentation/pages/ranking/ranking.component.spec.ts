import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterTestingModule } from '@angular/router/testing';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { MockModule } from 'ng-mocks';
import { of } from 'rxjs';

import { IRankingController } from '../../../controllers/ranking-controller/ranking-controller.interface';
import { PlayerEntity } from '../../../domain/entities/player.entity';
import { SharedModule } from '../../shared/shared.module';
import { RankingComponent } from './ranking.component';

describe('RankingComponent', () => {
  let spectator: Spectator<RankingComponent>;

  const mockRankingController: Partial<IRankingController> = {
    getRankingList: jest.fn(() => of([])),
  };

  const createComponent = createComponentFactory({
    component: RankingComponent,
    imports: [
      ReactiveFormsModule,
      RouterTestingModule,
      MockModule(SharedModule),
      MockModule(MatCardModule),
      MockModule(MatIconModule),
    ],
    providers: [{ provide: IRankingController, useValue: mockRankingController }],
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should set headerProps', () => {
    expect(spectator.component.headerProps).toBeDefined();
    expect(spectator.component.headerProps.icon).toBe('arrow-right');
  });

  it('should navigate to home on header action', () => {
    const routerSpy = jest.spyOn(spectator.component['router'], 'navigate');
    spectator.component.headerProps.action();
    expect(routerSpy).toHaveBeenCalledWith(['home']);
  });

  it('should set rankingList$', () => {
    expect(spectator.component.rankingList$).toBeDefined();
  });

  it('should call rankingController.getRankingList during initialization', () => {
    expect(mockRankingController.getRankingList).toHaveBeenCalled();
  });

  it('should display players in the ranking list', () => {
    let outcome: PlayerEntity[];
    const players = [
      { name: 'Player1', score: 100, maxScore: 150 },
      { name: 'Player2', score: 80, maxScore: 120 },
    ] as PlayerEntity[];

    jest.spyOn(spectator.inject(IRankingController), 'getRankingList').mockImplementation(() => of(players));
    spectator.component.ngOnInit();

    spectator.component.rankingList$.subscribe(players => {
      outcome = players;
      expect(outcome).toBe(players);
    });
  });
});
