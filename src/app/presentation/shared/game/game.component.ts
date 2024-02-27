import { Component, EventEmitter, Input, Output } from '@angular/core';

import { PlayerEntity } from '../../../domain/entities/player.entity';
import { FootSide } from '../../../domain/model/foot-side.enum';
import { SemaphoreState } from '../../../domain/model/semaphore-state.enum';
import { StepModel } from '../../../domain/model/step.model';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
})
export class GameComponent {
  @Input() player!: PlayerEntity;
  @Input() light: SemaphoreState = SemaphoreState.RED;
  @Output() stepChanged = new EventEmitter<StepModel>();

  public FootSide = FootSide;

  public handleStepClick(step: StepModel): void {
    this.stepChanged.emit(step);
  }
}
