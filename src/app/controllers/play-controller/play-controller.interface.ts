import { Observable } from 'rxjs';

import { PlayerEntity } from '../../domain/entities/player.entity';
import { PlayerStepModel } from '../../domain/model/player-step.model';
import { SemaphoreState } from '../../domain/model/semaphore-state.enum';

export abstract class IPlayController {
  abstract startGame(player: PlayerEntity): void;
  abstract savePlayer(player: PlayerEntity): void;
  abstract walkPlayer(player: PlayerStepModel): void;
  abstract startSemaphore(): Observable<SemaphoreState>;
  abstract pauseBackgroundMusic(): void;
}
