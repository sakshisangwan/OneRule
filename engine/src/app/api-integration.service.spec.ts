import { TestBed } from '@angular/core/testing';

import { ApiIntegrationService } from './api-integration.service';

describe('ApiIntegrationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiIntegrationService = TestBed.get(ApiIntegrationService);
    expect(service).toBeTruthy();
  });
});
