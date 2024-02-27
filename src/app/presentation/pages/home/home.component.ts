import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { IHomeController } from '../../../controllers/home-controller/home-controller.interface';
import { FormFieldProps } from '../../shared/form-input/form-input.component';
import { HeaderProps } from '../../shared/header/header.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  public form!: FormGroup;
  public formProps!: FormFieldProps;
  public headerProps!: HeaderProps;

  public constructor(
    private router: Router,
    private homeController: IHomeController
  ) {}

  ngOnInit(): void {
    this.setFormProps();
    this.setHeaderProps();
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

  private setHeaderProps = (): void => {
    this.headerProps = {
      label: 'Ranking',
      icon: 'leaderboard',
      action: this.navigateToRankingPage,
    };
  };

  public navigateToRankingPage = (): void => {
    this.router.navigate(['ranking']);
  };

  public handleJoinClick = (): void => {
    if (this.playerName.valid) {
      this.homeController.joinPlayer(this.playerName.value);
    }
  };
}
