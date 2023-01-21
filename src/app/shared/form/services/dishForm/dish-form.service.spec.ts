import { TestBed } from '@angular/core/testing';

import { DishFormService } from './dish-form.service';

describe('DishFormService', () => {
  let service: DishFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DishFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
