import { TestBed } from '@angular/core/testing';

import { BundlingService } from './bundling.service';

describe('BundlingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BundlingService = TestBed.get(BundlingService);
    expect(service).toBeTruthy();
  });
});
