import { TestBed } from '@angular/core/testing';

import { QuantityModifierService } from './quantity-modifier.service';

describe('QuantityModifierService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QuantityModifierService = TestBed.get(QuantityModifierService);
    expect(service).toBeTruthy();
  });
});
