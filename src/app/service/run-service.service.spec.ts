import {TestBed} from '@angular/core/testing';

import {RunService} from './run.service';

describe('RunServiceService', () => {
  let service: RunService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RunService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
