import { Component, Input } from '@angular/core';

export type ToolbarProps = {
  icon: string;
  label?: string;
  title?: string;
  backgroundColor: string;
  action: () => void;
};

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss',
})
export class ToolbarComponent {
  @Input() props!: ToolbarProps;
}
