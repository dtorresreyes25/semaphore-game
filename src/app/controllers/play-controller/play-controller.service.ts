import { DestroyRef, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { map, Observable, Subject } from 'rxjs';

import { PlayerEntity } from '../../domain/entities/player.entity';
import { ISemaphore } from '../../domain/interfaces/semaphore.interface';
import { Param } from '../../domain/model/param.payload';
import { PlayerStepModel } from '../../domain/model/player-step.model';
import { SemaphoreIntervalsModel } from '../../domain/model/semaphore-intervals.model';
import { SemaphoreState } from '../../domain/model/semaphore-state.enum';
import { SavePlayerUsecase } from '../../domain/usecases/player/save-player.usecase';
import { WalkPlayerUsecase } from '../../domain/usecases/player/walk-player.usecase';
import { StartSemaphoreUsecase } from '../../domain/usecases/semaphore/start-semaphore.usecase';
import { IPlayController } from './play-controller.interface';

@Injectable()
export class PlayControllerService implements IPlayController {
  private player$ = new Subject<PlayerEntity>();

  constructor(
    private destroyRef: DestroyRef,
    private semaphoreService: ISemaphore,
    private savePlayerUsecase: SavePlayerUsecase,
    private walkPlayerUsecase: WalkPlayerUsecase,
    private startSemaphoreUsecase: StartSemaphoreUsecase
  ) {
    this.refreshSemaphoreIntervals();
  }

  public refreshSemaphoreIntervals(): void {
    this.player$
      .pipe(
        map((player: PlayerEntity) => player.score),
        map((score: number) => this.startSemaphoreUsecase.execute(new Param(score))),
        map((intervals: SemaphoreIntervalsModel) => this.semaphoreService.refreshIntervals(intervals)),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }

  public startSemaphore(): Observable<SemaphoreState> {
    return this.semaphoreService.startTimer();
  }

  public startGame(player: PlayerEntity): void {
    this.player$.next(player);
  }

  public walkPlayer(playerStep: PlayerStepModel): void {
    this.player$.next(this.walkPlayerUsecase.execute(new Param(playerStep)));
  }

  public savePlayer(player: PlayerEntity): void {
    this.savePlayerUsecase.execute(new Param(player));
  }
}
