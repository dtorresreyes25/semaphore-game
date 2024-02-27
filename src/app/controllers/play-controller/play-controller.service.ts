import { DestroyRef, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { distinctUntilChanged, map, Observable, Subject, tap } from 'rxjs';

import { PlayerEntity } from '../../domain/entities/player.entity';
import { ISemaphore } from '../../domain/interfaces/semaphore.interface';
import { Param } from '../../domain/model/param.payload';
import { PlayerStepModel } from '../../domain/model/player-step.model';
import { SemaphoreIntervalsModel } from '../../domain/model/semaphore-intervals.model';
import { SemaphoreState } from '../../domain/model/semaphore-state.enum';
import { SavePlayerUsecase } from '../../domain/usecases/player/save-player.usecase';
import { WalkPlayerUsecase } from '../../domain/usecases/player/walk-player.usecase';
import { StartSemaphoreUsecase } from '../../domain/usecases/semaphore/start-semaphore.usecase';
import { MusicService } from '../../services/music/music.service';
import { IPlayController } from './play-controller.interface';

@Injectable()
export class PlayControllerService implements IPlayController {
  private player$ = new Subject<PlayerEntity>();

  constructor(
    private destroyRef: DestroyRef,
    private semaphoreService: ISemaphore,
    private savePlayerUsecase: SavePlayerUsecase,
    private walkPlayerUsecase: WalkPlayerUsecase,
    private startSemaphoreUsecase: StartSemaphoreUsecase,
    private musicService: MusicService
  ) {
    this.refreshSemaphoreIntervals();
  }

  public refreshSemaphoreIntervals(): void {
    this.player$
      .pipe(
        map((player: PlayerEntity) => player.score),
        map((score: number) => this.startSemaphoreUsecase.execute(new Param(score))),
        tap((intervals: SemaphoreIntervalsModel) => {
          this.musicService.setPlaybackRate(intervals.green);
        }),
        map((intervals: SemaphoreIntervalsModel) => this.semaphoreService.refreshIntervals(intervals)),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }

  public startSemaphore(): Observable<SemaphoreState> {
    return this.semaphoreService.startTimer().pipe(
      distinctUntilChanged(),
      tap(semaphoreState => {
        semaphoreState === SemaphoreState.GREEN
          ? this.musicService.playBackgroundMusic()
          : this.musicService.pauseBackgroundMusic();
      })
    );
  }

  public startGame(player: PlayerEntity): void {
    this.player$.next(player);
  }

  public walkPlayer(playerStep: PlayerStepModel): void {
    if (playerStep.semaphoreState === SemaphoreState.RED && playerStep.player.score) {
      this.musicService.playErrorSound();
      this.vibratePhone();
    }
    this.player$.next(this.walkPlayerUsecase.execute(new Param(playerStep)));
  }

  public savePlayer(player: PlayerEntity): void {
    this.savePlayerUsecase.execute(new Param(player));
  }

  private vibratePhone(): void {
    'vibrate' in navigator
      ? navigator.vibrate(200)
      : console.log('La vibración no es compatible en este dispositivo/navegador.');
  }
}
