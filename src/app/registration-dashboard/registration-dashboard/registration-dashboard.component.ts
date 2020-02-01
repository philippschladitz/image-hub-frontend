import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { StepsService } from '../../shared';

@Component({
  selector: 'app-registration-dashboard',
  templateUrl: './registration-dashboard.component.html',
  styleUrls: ['./registration-dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegistrationDashboardComponent implements OnInit, OnDestroy {
  step = 0;
  topics = [];
  progressValue = 0;

  private progressBarIntervalId: number;

  constructor(private readonly stepsService: StepsService, private readonly changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit() {
    this.stepsService.getAvailableTopics().subscribe(response => {
      this.topics = response.map(t => ({
        name: t.id,
        imageUrl: t.imageUrl
      }));
    });
  }

  ngOnDestroy() {
    window.clearInterval(this.progressBarIntervalId);
  }

  next() {
    this.step++;

    if (this.step === 4) {
      this.fillProgressBar();
    }
  }

  private fillProgressBar() {
    this.progressBarIntervalId = window.setInterval(() => {
      if (this.progressValue < 100) {
        this.progressValue += 100 / 5 / 100;
        this.changeDetectorRef.markForCheck();
      }
    }, 10);
  }
}
