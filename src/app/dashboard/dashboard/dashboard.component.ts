import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { StepsService } from '@app/shared';
import { tap, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {
  firstVisit = true;
  name: string;
  availableTopics = [];
  topics = [];

  constructor(private readonly changeDetectorRef: ChangeDetectorRef, private readonly stepsService: StepsService) {}

  ngOnInit() {
    this.stepsService.getName().subscribe(result => {
      this.name = result;
      this.changeDetectorRef.markForCheck();
    });

    this.stepsService
      .getAvailableTopics()
      .pipe(
        tap(result => {
          this.availableTopics = result;
          this.changeDetectorRef.markForCheck();
        }),
        switchMap(() => this.stepsService.getTopics())
      )
      .subscribe(result => {
        this.topics = result.topics.map(topic => {
          const title = topic;

          const findTopic = this.availableTopics.find(t => t.id === topic);
          if (!findTopic) {
            console.error(`Topic ${title} not found.`);
          }

          return {
            title,
            imageUrl: findTopic.imageUrl
          };
        });
        this.changeDetectorRef.markForCheck();
      });
  }

  closeBanner() {
    this.firstVisit = false;
    this.changeDetectorRef.markForCheck();
  }
}
