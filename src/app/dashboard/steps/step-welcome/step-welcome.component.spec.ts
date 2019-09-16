import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StepWelcomeComponent } from './step-welcome.component';

describe('StepWelcomeComponent', () => {
  let component: StepWelcomeComponent;
  let fixture: ComponentFixture<StepWelcomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StepWelcomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepWelcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
