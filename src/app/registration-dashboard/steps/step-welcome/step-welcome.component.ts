import { Component, ChangeDetectionStrategy, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { StepsService } from '../steps.service';

@Component({
  selector: 'app-step-welcome',
  templateUrl: './step-welcome.component.html',
  styleUrls: ['./step-welcome.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StepWelcomeComponent {
  @Output() next = new EventEmitter();

  name = '';

  constructor(
    private readonly stepsService: StepsService,
    private readonly changeDetectorRef: ChangeDetectorRef,
  ) {
    stepsService.getName().subscribe(name => {
      this.name = name;
      this.changeDetectorRef.markForCheck();
    });
  }

  onNext() {
    this.next.emit();
  }
}
