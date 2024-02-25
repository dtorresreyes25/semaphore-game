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
import { ToolbarComponent } from './toolbar/toolbar.component';

@NgModule({
  declarations: [ButtonComponent, FormInputComponent, ToolbarComponent],
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
  exports: [ButtonComponent, FormInputComponent, ToolbarComponent],
})
export class SharedModule {}
