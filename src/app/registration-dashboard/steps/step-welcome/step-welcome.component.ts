import { Component, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-step-welcome',
  templateUrl: './step-welcome.component.html',
  styleUrls: ['./step-welcome.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StepWelcomeComponent {
  @Output() next = new EventEmitter();

  onNext() {
    this.next.emit();
  }
}
