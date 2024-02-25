import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game',
  template: ' <p>game works!</p> ',
  styleUrl: './game.component.scss',
})
export class GameComponent {
  constructor(private router: Router) {
    const data = this.router.getCurrentNavigation()?.extras.state?.['player'];
    console.log(data);
    if (!data) {
      this.router.navigate(['']);
    }
  }
}
