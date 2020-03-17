import { Component, ChangeDetectionStrategy, Input, ChangeDetectorRef, HostBinding } from '@angular/core';
import { Pin, PinService } from '@app/shared';

@Component({
  selector: 'app-pin',
  templateUrl: './pin.component.html',
  styleUrls: ['./pin.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PinComponent {
  @Input() pin: Pin;

  pinAskBlackListReason = false;
  blur = false;

  get imageUrl() {
    return this.pin.image;
  }

  get url() {
    return new URL(this.pin.link).host;
  }

  get topicName() {
    return this.pin.topic;
  }

  constructor(private readonly pinService: PinService, private readonly changeDetectoRef: ChangeDetectorRef) {}

  blacklist(event: Event) {
    event.stopPropagation();
    this.pinService.blacklist(this.pin.id).subscribe(
      result => {
        this.pinAskBlackListReason = true;
        this.blur = true;
        this.changeDetectoRef.markForCheck();
      },
      err => {
        console.error(err);
      }
    );
  }

  revertBlacklist() {
    this.pinService.revertBlacklist(this.pin.id).subscribe(
      result => {
        this.pinAskBlackListReason = false;
        this.blur = false;
        this.changeDetectoRef.markForCheck();
      },
      err => {
        console.error(err);
      }
    );
  }
}
