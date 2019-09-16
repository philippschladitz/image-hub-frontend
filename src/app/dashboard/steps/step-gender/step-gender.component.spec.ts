import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StepGenderComponent } from './step-gender.component';

describe('StepGenderComponent', () => {
  let component: StepGenderComponent;
  let fixture: ComponentFixture<StepGenderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StepGenderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepGenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
