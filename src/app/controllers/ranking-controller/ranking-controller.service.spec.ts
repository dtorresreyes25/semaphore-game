import { TestBed } from '@angular/core/testing';

import { RankingControllerService } from './ranking-controller.service';

describe('RankingControllerService', () => {
  let service: RankingControllerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RankingControllerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
