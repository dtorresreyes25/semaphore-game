import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { HomeControllerService } from './controllers/home-controller/home-controller.service';
import { IHomeController } from './controllers/home-controller/homeController.interface';
import { PlayerRepository } from './data/repository/local/player.repository';
import { DomainModule } from './domain/domain.module';
import { IPlayerRepository } from './domain/interfaces/player-repository.interface';
import { CreatePlayerUsecase } from './domain/usecases/player/create-player.usecase';
import { GetOnePlayerUsecase } from './domain/usecases/player/get-one-player.usecase';
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
      provide: IHomeController,
      useClass: HomeControllerService,
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
