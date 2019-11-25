import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StepTopicsComponent } from './step-topics.component';

describe('StepTopicsComponent', () => {
  let component: StepTopicsComponent;
  let fixture: ComponentFixture<StepTopicsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StepTopicsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepTopicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
