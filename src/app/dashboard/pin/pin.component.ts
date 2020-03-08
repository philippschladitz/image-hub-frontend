import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Pin } from '@app/shared';

@Component({
  selector: 'app-pin',
  templateUrl: './pin.component.html',
  styleUrls: ['./pin.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PinComponent {
  @Input() pin: Pin;

  get imageUrl() {
    return this.pin.image;
  }
}