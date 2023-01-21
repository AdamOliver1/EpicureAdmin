import { TestBed } from '@angular/core/testing';

import { ChefFormService } from './chef-form.service';

describe('ChefFormService', () => {
  let service: ChefFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChefFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
