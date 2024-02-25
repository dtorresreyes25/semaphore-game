import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

import { IHomeController } from '../../../controllers/home-controller/homeController.interface';
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

  public constructor(private homeController: IHomeController) {}

  ngOnInit(): void {
    this.setFormProps();
    this.setToolbarProps();
  }

  private get playerName(): AbstractControl {
    return this.form.get('name') as AbstractControl;
  }

  private createForm(): void {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
    });
  }

  private setFormProps = (): void => {
    this.createForm();
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

  public handleJoinClick(): void {
    if (this.playerName.valid) {
      this.homeController.joinPlayer(this.playerName.value);
    }
  }
}
