import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatToolbar } from '@angular/material/toolbar';

import { ButtonComponent } from './button/button.component';
import { FormInputComponent } from './form-input/form-input.component';
import { GameComponent } from './game/game.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [ButtonComponent, FormInputComponent, HeaderComponent, GameComponent],
  imports: [
    CommonModule,
    MatFormField,
    MatInput,
    MatLabel,
    MatIcon,
    MatButton,
    ReactiveFormsModule,
    MatError,
    MatToolbar,
    MatIconButton,
  ],
  exports: [ButtonComponent, FormInputComponent, HeaderComponent, GameComponent],
})
export class SharedModule {}
