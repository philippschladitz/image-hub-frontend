import { Component, ChangeDetectionStrategy, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { StepsService } from '../steps.service';
import { APIService } from '@app/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-step-welcome',
  templateUrl: './step-welcome.component.html',
  styleUrls: ['./step-welcome.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StepWelcomeComponent {
  @Output() next = new EventEmitter();

  email = '';
  name = '';

  constructor(
    private readonly apiService: APIService,
    private readonly stepsService: StepsService,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly router: Router
  ) {
    stepsService.getName().subscribe(name => {
      this.name = name;
      this.changeDetectorRef.markForCheck();
    });

    stepsService.getEmail().subscribe(email => {
      this.email = email;
      this.changeDetectorRef.markForCheck();
    });
  }

  onNext() {
    this.next.emit();
  }

  useLogin() {
    this.apiService.clear();
    // angular has a bug where navigateByUrl doesnt support queryParams
    // issue 18798 on angular github
    this.router.navigate(['/auth'], {
      queryParams: {
        login: true
      }
    });
  }
}
