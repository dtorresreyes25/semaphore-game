import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

import { PlayerEntity } from '../../../domain/entities/player.entity';
import { FootSide } from '../../../domain/model/foot-side.enum';
import { SemaphoreState } from '../../../domain/model/semaphore-state.enum';
import { StepModel } from '../../../domain/model/step.model';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
})
export class GameComponent implements OnChanges {
  @Input() player!: PlayerEntity;
  @Input() light!: SemaphoreState | null;
  @Output() stepChanged = new EventEmitter<StepModel>();

  public FootSide = FootSide;
  public isCurrentLightGreen = false;

  ngOnChanges({ light }: SimpleChanges) {
    if (light.currentValue) {
      this.isCurrentLightGreen = this.light === SemaphoreState.GREEN;
    }
  }

  public handleStepClick(step: StepModel): void {
    this.stepChanged.emit(step);
  }
}
