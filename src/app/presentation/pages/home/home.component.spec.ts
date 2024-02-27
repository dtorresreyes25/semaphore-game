import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterTestingModule } from '@angular/router/testing';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { MockModule } from 'ng-mocks';

import { IHomeController } from '../../../controllers/home-controller/home-controller.interface';
import { SharedModule } from '../../shared/shared.module';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let spectator: Spectator<HomeComponent>;
  const createComponent = createComponentFactory({
    component: HomeComponent,
    imports: [
      ReactiveFormsModule,
      RouterTestingModule,
      MockModule(SharedModule),
      MockModule(MatCardModule),
      MockModule(MatIconModule),
    ],
    providers: [
      {
        provide: IHomeController,
        useValue: {
          joinPlayer: jest.fn,
        },
      },
    ],
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  it('should create the component', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should initialize form and headerProps on ngOnInit', () => {
    spectator.component.ngOnInit();
    expect(spectator.component.form).toBeDefined();
    expect(spectator.component.formProps).toBeDefined();
    expect(spectator.component.headerProps).toBeDefined();
  });

  it('should navigate to ranking page when header action is triggered', () => {
    const navigateSpy = jest.spyOn(spectator.component['router'], 'navigate');
    spectator.component.navigateToRankingPage();
    expect(navigateSpy).toHaveBeenCalledWith(['ranking']);
  });

  it('should not call homeController.joinPlayer when handleJoinClick is triggered with invalid playerName', () => {
    const homeController = spectator.inject(IHomeController);
    const joinPlayerSpy = jest.spyOn(homeController, 'joinPlayer');
    spectator.component.form.patchValue({ name: '' });
    spectator.component.handleJoinClick();
    expect(joinPlayerSpy).not.toHaveBeenCalled();
  });

  it('should call homeController.joinPlayer when handleJoinClick is triggered with valid playerName', () => {
    const homeController = spectator.inject(IHomeController);
    const joinPlayerSpy = jest.spyOn(homeController, 'joinPlayer');
    spectator.component.form.patchValue({ name: 'Player123' });
    spectator.component.handleJoinClick();
    expect(joinPlayerSpy).toHaveBeenCalledWith('Player123');
  });
});
