import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';

import { PlayerEntity } from '../../domain/entities/player.entity';
import { Param } from '../../domain/model/param.payload';
import { CreatePlayerUsecase } from '../../domain/usecases/player/create-player/create-player.usecase';
import { GetOnePlayerUsecase } from '../../domain/usecases/player/get-one-player/get-one-player.usecase';
import { IHomeController } from './home-controller.interface';

@Injectable()
export class HomeControllerService implements IHomeController {
  constructor(
    private createPlayerUsecase: CreatePlayerUsecase,
    private getOnePlayerUsecase: GetOnePlayerUsecase,
    private router: Router
  ) {}

  public joinPlayer(name: string): void {
    this.getOnePlayerUsecase
      .execute(new Param(name))
      .pipe(
        switchMap(player => {
          return !player ? this.createPlayer(name) : of(player);
        })
      )
      .subscribe(player => {
        this.router.navigateByUrl('play', {
          state: {
            player,
          },
        });
      });
  }

  private createPlayer(name: string): Observable<PlayerEntity> {
    const newPlayer = new PlayerEntity(name);
    return this.createPlayerUsecase.execute(new Param(newPlayer));
  }
}
