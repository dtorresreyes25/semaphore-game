import 'jest-preset-angular/setup-jest';

import { ngMocks } from 'ng-mocks'; // eslint-disable-line import/order

ngMocks.autoSpy('jest');

import { DefaultTitleStrategy, TitleStrategy } from '@angular/router'; // eslint-disable-line import/order
import { MockService } from 'ng-mocks'; // eslint-disable-line import/order
ngMocks.defaultMock(TitleStrategy, () => MockService(DefaultTitleStrategy));

import { CommonModule } from '@angular/common'; // eslint-disable-line import/order
import { ApplicationModule } from '@angular/core'; // eslint-disable-line import/order
import { BrowserModule } from '@angular/platform-browser'; // eslint-disable-line import/order
ngMocks.globalKeep(ApplicationModule, true);
ngMocks.globalKeep(CommonModule, true);
ngMocks.globalKeep(BrowserModule, true);
