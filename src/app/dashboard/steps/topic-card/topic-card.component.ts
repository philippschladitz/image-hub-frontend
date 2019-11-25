import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { TopicCardChange } from './topic-card-change';

@Component({
  selector: 'app-topic-card',
  templateUrl: './topic-card.component.html',
  styleUrls: ['./topic-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopicCardComponent {
  @Input() topicName: string;
  @Input() imageUrl: string;
  @Output() change = new EventEmitter<TopicCardChange>();

  checked = false;
}
