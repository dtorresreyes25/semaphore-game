import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { FormFieldProps } from '../../shared/form-input/form-input.component';
import { ToolbarProps } from '../../shared/toolbar/toolbar.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  public form!: FormGroup;
  public formProps!: FormFieldProps;
  public toolbarProps!: ToolbarProps;

  ngOnInit(): void {
    this.setFormProps();
    this.setToolbarProps();
  }

  private initForm(): void {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
    });
  }

  private setFormProps = (): void => {
    this.initForm();
    this.formProps = { formGroup: this.form, controlName: 'name', required: true };
  };

  private setToolbarProps = (): void => {
    this.toolbarProps = {
      icon: 'leaderboard',
      label: 'Ranking',
      backgroundColor: 'accent',
      action: this.handleOnNavigateToRankingPage,
    };
  };

  public handleOnNavigateToRankingPage(): void {}

  public handleOnSubmit(): void {}
}
