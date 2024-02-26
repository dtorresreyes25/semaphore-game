import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PlayerEntity } from '../../../domain/entities/player.entity';
import { HeaderProps } from '../../shared/header/header.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
})
export class GameComponent implements OnInit {
  public player!: PlayerEntity;
  public headerProps!: HeaderProps;

  constructor(private router: Router) {
    this.player = this.getPlayer();
  }

  ngOnInit(): void {
    this.setHeaderProps();
  }

  private navigateHome(): void {
    this.router.navigate(['']);
  }

  private getPlayer(): PlayerEntity {
    const player = this.router.getCurrentNavigation()?.extras.state?.['player'];

    if (!player) {
      this.navigateHome();
    }

    return player;
  }

  private setHeaderProps = (): void => {
    this.headerProps = {
      icon: 'logout',
      playerName: this.player.name,
      action: () => this.navigateHome(),
    };
  };
}
