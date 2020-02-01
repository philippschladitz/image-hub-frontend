import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { StepsService } from '../../../shared';
import { minimumTopicsToSelectValidator } from '../minimum-topics-to-select.validator';

@Component({
  selector: 'app-step-topics',
  templateUrl: './step-topics.component.html',
  styleUrls: ['./step-topics.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StepTopicsComponent implements OnInit {
  @Input() topics: {
    name: string;
    imageUrl: string;
  }[];
  @Output() next = new EventEmitter();
  form: FormGroup;

  get isNextEnabled() {
    return this.form.valid;
  }

  get formTopics() {
    return this.form.get('topics') as FormArray;
  }

  get topicsToSelect() {
    return Math.max(0, 5 - this.formTopics.controls.filter(control => control.value).length);
  }

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly stepsService: StepsService
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      topics: this.formBuilder.array(this.topics.map(topic =>
        this.formBuilder.control(false),
      ), [
        Validators.required
      ])
    }, {
      validators: [
        minimumTopicsToSelectValidator
      ]
    });
  }

  onNext() {
    if (this.form.valid) {
      const selectedTopics = (this.form.value.topics as boolean[])
        .map((selected, i) => ({
          name: this.topics[i].name,
          selected
        }))
        .filter(topic => topic.selected)
        .map(topic => topic.name);

      this.stepsService.postTopics({
        topics: selectedTopics,
      }).subscribe(() => {
        this.next.emit();
      });
    }
  }

  trackByTopicName(index, topic) {
    return topic.name;
  }
}
