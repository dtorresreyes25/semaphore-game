import { TestBed } from '@angular/core/testing';

import { HomeControllerService } from './home-controller.service';

describe('HomeControllerService', () => {
  let service: HomeControllerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HomeControllerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
