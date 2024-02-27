import { Component, Input } from '@angular/core';

import { PlayerEntity } from '../../../domain/entities/player.entity';

@Component({
  selector: 'app-ranking-list',
  templateUrl: './ranking-list.component.html',
  styleUrl: './ranking-list.component.scss',
})
export class RankingListComponent {
  @Input() rankings: PlayerEntity[] | null = [];
}
