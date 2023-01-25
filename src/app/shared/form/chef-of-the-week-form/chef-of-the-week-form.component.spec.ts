import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChefOfTheWeekFormComponent } from './chef-of-the-week-form.component';

describe('ChefOfTheWeekFormComponent', () => {
  let component: ChefOfTheWeekFormComponent;
  let fixture: ComponentFixture<ChefOfTheWeekFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChefOfTheWeekFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChefOfTheWeekFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
