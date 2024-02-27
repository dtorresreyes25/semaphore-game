import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { IRankingController } from '../../../controllers/ranking-controller/ranking-controller.interface';
import { PlayerEntity } from '../../../domain/entities/player.entity';
import { HeaderProps } from '../../shared/header/header.component';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrl: './ranking.component.scss',
})
export class RankingComponent implements OnInit {
  public headerProps!: HeaderProps;
  public rankingList$!: Observable<PlayerEntity[]>;

  public constructor(
    private router: Router,
    private rankingController: IRankingController
  ) {}

  ngOnInit(): void {
    this.setHeaderProps();
    this.setRankingList();
  }

  private setRankingList = (): void => {
    this.rankingList$ = this.rankingController.getRankingList();
  };

  private setHeaderProps = (): void => {
    this.headerProps = {
      icon: 'logout',
      action: () => this.navigateHome(),
    };
  };

  private navigateHome(): void {
    this.router.navigate(['home']);
  }
}
