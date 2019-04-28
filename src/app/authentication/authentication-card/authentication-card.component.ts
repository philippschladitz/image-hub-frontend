import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-authentication-card',
  templateUrl: './authentication-card.component.html',
  styleUrls: ['./authentication-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthenticationCardComponent {
  @Input() buttonLabel: string;
  @Output() buttonClick = new EventEmitter();
}
