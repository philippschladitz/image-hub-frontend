import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

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

  get fiveTopics() {
    return this.topics ? this.topics.slice(0, 5) : [];
  }
}
