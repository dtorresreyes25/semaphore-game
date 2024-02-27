import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';

import { SharedModule } from '../../shared/shared.module';
import { RankingComponent } from './ranking.component';
import { RankingRoutingModule } from './ranking-routing.module';

@NgModule({
  declarations: [RankingComponent],
  imports: [
    CommonModule,
    RankingRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    MatCardHeader,
    MatCardContent,
    MatCard,
    MatCardTitle,
    MatCardActions,
    MatIcon,
    MatIconButton,
    MatButton,
  ],
})
export class RankingModule {}
