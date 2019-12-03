import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { StepsService } from '../steps';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {
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
