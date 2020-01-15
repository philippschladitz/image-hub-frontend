import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { StepperComponent } from './stepper.component';

describe('StepperComponent', () => {
  let component: StepperComponent;
  let fixture: ComponentFixture<StepperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StepperComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepperComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should highlight step 2 as red', () => {
    component.step = 1;
    fixture.detectChanges();
    const redElements = fixture.debugElement.queryAll(By.css('.red'));
    expect(redElements.length).toEqual(1);

    const secondCircleHasClassRed = fixture.debugElement.queryAll(By.css('.circle'))[1].classes.red;
    expect(secondCircleHasClassRed).toBeTruthy();
  });

  it('should not highlight any other than step 2', () => {
    component.step = 1;
    fixture.detectChanges();

    const circles = fixture.debugElement.queryAll(By.css('.circle'));
    let index = 0;
    for (const circle of circles) {
      if (index !== 1) {
        expect(circle.classes.red).toBeFalsy();
      }
      index++;
    }
  });
});
