import { TestBed } from '@angular/core/testing';

import { StepsService } from './steps.service';

describe('StepsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StepsService = TestBed.get(StepsService);
    expect(service).toBeTruthy();
  });
});
