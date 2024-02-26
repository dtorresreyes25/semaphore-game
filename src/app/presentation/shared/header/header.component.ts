import { Component, Input } from '@angular/core';

export type HeaderProps = {
  icon: string;
  label?: string;
  playerName?: string;
  action: () => void;
};

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  @Input() props!: HeaderProps;
}
