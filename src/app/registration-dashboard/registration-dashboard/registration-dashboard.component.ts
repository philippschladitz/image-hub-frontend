import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { StepsService } from '../steps';

@Component({
  selector: 'app-registration-dashboard',
  templateUrl: './registration-dashboard.component.html',
  styleUrls: ['./registration-dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegistrationDashboardComponent implements OnInit {
  step = 0;
  topics = [];

  constructor(
    private readonly stepsService: StepsService,
  ) { }

  ngOnInit() {
    this.stepsService.getAvailableTopics().subscribe(response => {
      this.topics = response.map(t => ({
        name: t.id,
        imageUrl: t.imageUrl
      }));
    });
  }

  next() {
    this.step++;
  }
}
