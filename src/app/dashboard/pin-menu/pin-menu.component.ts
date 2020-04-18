import { Component, ChangeDetectionStrategy, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-pin-menu',
  templateUrl: './pin-menu.component.html',
  styleUrls: ['./pin-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PinMenuComponent {
  @Input() imageUrl = '';
  @Input() pinAskBlackListReason = false;
  @Input() showBlacklistOption = true;
  @Input() topicName = '';
  @Output() blacklist = new EventEmitter<Event>();

  blacklistAndStopPropagation(event: Event) {
    event.stopPropagation();
    event.preventDefault();
    this.blacklist.emit(event);
  }
}
