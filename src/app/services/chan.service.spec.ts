import { TestBed } from '@angular/core/testing';

import { ChanService } from './chan.service';

describe('ChanService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChanService = TestBed.get(ChanService);
    expect(service).toBeTruthy();
  });
});
