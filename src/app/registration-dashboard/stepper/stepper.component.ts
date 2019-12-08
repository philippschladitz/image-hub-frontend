import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StepperComponent  {
  @Input() step = 0;

  isCircleActive(circle: number) {
    return {
      red: this.step === circle
    };
  }
}
