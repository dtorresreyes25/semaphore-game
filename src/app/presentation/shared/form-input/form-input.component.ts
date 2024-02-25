import { Component, Input } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

export type FormFieldProps = {
  required: boolean;
  controlName: string;
  formGroup: FormGroup;
};

@Component({
  selector: 'app-form-input',
  templateUrl: './form-input.component.html',
  styleUrl: 'form-input.component.scss',
})
export class FormInputComponent {
  @Input() props?: FormFieldProps;

  get control(): AbstractControl {
    return this.props?.formGroup.get(this.props?.controlName) as AbstractControl;
  }
}
