import { Component, ChangeDetectionStrategy, Input, forwardRef, HostListener, HostBinding } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-topic-card',
  templateUrl: './topic-card.component.html',
  styleUrls: ['./topic-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TopicCardComponent),
    multi: true,
  }]
})
export class TopicCardComponent implements ControlValueAccessor {
  @Input() topicName: string;
  @Input() imageUrl: string;
  @HostBinding('class.checked') isChecked: boolean;

  get checked() {
    return this._checked;
  }

  set checked(value) {
    this._checked = value;
    this.isChecked = this._checked;
    this.onChangeFn(value);
    this.onTouchFn(value);
  }

  private _checked = false;
  private onChangeFn: (_: boolean) => void;
  private onTouchFn: (_: boolean) => void;

  @HostListener('click') onClick() {
    this.checked = !this.checked;
  }

  writeValue(checked: boolean) {
    this._checked = checked;
  }

  registerOnChange(fn: (_) => void) {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: (_) => void) {
    this.onTouchFn = fn;
  }
}
