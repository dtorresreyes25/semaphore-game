import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { IHomeController } from './controllers/home-controller/home-controller.interface';
import { HomeControllerService } from './controllers/home-controller/home-controller.service';
import { IPlayController } from './controllers/play-controller/play-controller.interface';
import { PlayControllerService } from './controllers/play-controller/play-controller.service';
import { PlayerRepository } from './data/repository/local/player.repository';
import { SemaphoreService } from './data/service/semaphore.service';
import { DomainModule } from './domain/domain.module';
import { IPlayerRepository } from './domain/interfaces/player-repository.interface';
import { ISemaphore } from './domain/interfaces/semaphore.interface';
import { CreatePlayerUsecase } from './domain/usecases/player/create-player.usecase';
import { GetOnePlayerUsecase } from './domain/usecases/player/get-one-player.usecase';
import { SavePlayerUsecase } from './domain/usecases/player/save-player.usecase';
import { WalkPlayerUsecase } from './domain/usecases/player/walk-player.usecase';
import { StartSemaphoreUsecase } from './domain/usecases/semaphore/start-semaphore.usecase';
import { PresentationModule } from './presentation/presentation.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DomainModule, PresentationModule],
  providers: [
    {
      provide: IPlayerRepository,
      useClass: PlayerRepository,
    },
    {
      provide: ISemaphore,
      useClass: SemaphoreService,
    },

    {
      provide: IHomeController,
      useClass: HomeControllerService,
    },
    {
      provide: IPlayController,
      useClass: PlayControllerService,
    },
    {
      provide: StartSemaphoreUsecase,
      useFactory: () => new StartSemaphoreUsecase(),
    },
    {
      provide: WalkPlayerUsecase,
      useFactory: () => new WalkPlayerUsecase(),
    },
    {
      deps: [IPlayerRepository],
      provide: SavePlayerUsecase,
      useFactory: (repository: IPlayerRepository) => new SavePlayerUsecase(repository),
    },
    {
      deps: [IPlayerRepository],
      provide: CreatePlayerUsecase,
      useFactory: (repository: IPlayerRepository) => new CreatePlayerUsecase(repository),
    },
    {
      deps: [IPlayerRepository],
      provide: GetOnePlayerUsecase,
      useFactory: (repository: IPlayerRepository) => new GetOnePlayerUsecase(repository),
    },
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
