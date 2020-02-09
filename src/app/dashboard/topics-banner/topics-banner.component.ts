import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditTopicsDialogComponent } from '@app/shared';

@Component({
  selector: 'app-topics-banner',
  templateUrl: './topics-banner.component.html',
  styleUrls: ['./topics-banner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopicsBannerComponent {
  @Input() name: string;
  @Input() topics: Array<{
    title: string;
    imageUrl: string;
  }>;
  @Output() openDialog = new EventEmitter();

  get fiveTopics() {
    return this.topics ? this.topics.slice(0, 5) : [];
  }
}
