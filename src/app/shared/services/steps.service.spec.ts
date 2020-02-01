import { TestBed } from '@angular/core/testing';

import { StepsService } from './steps.service';
import { HttpClientModule } from '@angular/common/http';
import { APIService } from '@app/core';

describe('StepsService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [APIService, StepsService]
    })
  );

  it('should be created', () => {
    const service: StepsService = TestBed.get(StepsService);
    expect(service).toBeTruthy();
  });
});
