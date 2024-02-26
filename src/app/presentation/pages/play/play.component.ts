import { Component, DestroyRef, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';

import { IPlayController } from '../../../controllers/play-controller/play-controller.interface';
import { PlayerEntity } from '../../../domain/entities/player.entity';
import { PlayerStepModel } from '../../../domain/model/player-step.model';
import { SemaphoreState } from '../../../domain/model/semaphore-state.enum';
import { StepModel } from '../../../domain/model/step.model';
import { HeaderProps } from '../../shared/header/header.component';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrl: './play.component.scss',
})
export class PlayComponent implements OnInit {
  public player!: PlayerEntity;
  public headerProps!: HeaderProps;
  public semaphoreLight!: SemaphoreState;

  constructor(
    private router: Router,
    private destroyRef: DestroyRef,
    private playController: IPlayController
  ) {
    this.getPlayer();
  }

  ngOnInit(): void {
    this.setHeaderProps();
    this.startSemaphore();
    this.startGame();
  }

  private startSemaphore(): void {
    this.playController
      .startSemaphore()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(semaphoreState => {
        this.semaphoreLight = semaphoreState;
      });
  }

  private startGame(): void {
    this.playController.startGame(this.player);
  }

  private getPlayer(): void {
    this.router.events.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(event => {
      if (event instanceof NavigationEnd) {
        const routeData = this.router?.getCurrentNavigation()?.extras;
        const state = routeData?.state?.['player'] as PlayerEntity;

        if (state) {
          this.player = new PlayerEntity(state.name, state.score, state.maxScore);
        } else {
          this.navigateHome();
        }
      }
    });
  }

  private navigateHome(): void {
    this.router.navigate(['']);
  }

  public handleStepChanged(step: StepModel): void {
    const stepModel = new PlayerStepModel(step, this.player, this.semaphoreLight);

    this.playController.walkPlayer(stepModel);
    this.playController.savePlayer(this.player);
  }

  private setHeaderProps = (): void => {
    this.headerProps = {
      icon: 'logout',
      playerName: this.player.name,
      action: () => this.navigateHome(),
    };
  };
}
