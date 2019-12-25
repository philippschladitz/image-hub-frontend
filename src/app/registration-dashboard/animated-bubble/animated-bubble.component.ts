import { Component, ChangeDetectionStrategy, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'app-animated-bubble',
  templateUrl: './animated-bubble.component.html',
  styleUrls: ['./animated-bubble.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnimatedBubbleComponent {
  swirlIndex = Math.floor(Math.random() * 2);
  colorIndex = Math.floor(Math.random() * 3);
  randomAnimationDelay = (Math.round(Math.random()) * 2 - 1) * Math.floor(Math.random() * 4) + 's';

  get showColorOrangeGreen() {
    return this.colorIndex === 0;
  }

  get showColorBlueViolete() {
    return this.colorIndex === 1;
  }

  get showColorVioleteYellow() {
    return this.colorIndex === 2;
  }

  get showSwirlRight() {
    return this.swirlIndex === 0;
  }

  get showSwirlLeft() {
    return this.swirlIndex === 1;
  }

  @Input()
  @HostBinding('style.left')
  left: string;

  @Input()
  @HostBinding('style.top')
  top: string;
}
