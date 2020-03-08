import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { StepsService, EditTopicsDialogComponent } from '@app/shared';
import { tap, switchMap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { PinOverviewComponent } from '../pin-overview/pin-overview.component';

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

  @ViewChild(PinOverviewComponent)
  pinOverview: PinOverviewComponent;

  constructor(
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly stepsService: StepsService,
    private readonly matDialog: MatDialog
  ) {}

  ngOnInit() {
    this.stepsService.getName().subscribe(result => {
      this.name = result;
      this.changeDetectorRef.markForCheck();
    });

    this.init();
  }

  closeBanner() {
    this.firstVisit = false;
    this.changeDetectorRef.markForCheck();
  }

  openTopicsDialog() {
    this.matDialog
      .open(EditTopicsDialogComponent, {
        width: '80vw',
        data: {
          availableTopics: this.availableTopics.map(t => ({
            name: t.id,
            imageUrl: t.imageUrl
          })),
          selectedTopics: this.topics.map(t => ({
            name: t.title,
            imageUrl: t.imageUrl
          }))
        }
      })
      .afterClosed()
      .subscribe(success => {
        if (success) {
          this.init();
        }
      });
  }

  private init() {
    // load topics
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

        this.pinOverview.load();

        this.changeDetectorRef.markForCheck();
      });
  }
}
