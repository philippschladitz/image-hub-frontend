import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { StepsService } from '../steps.service';
import { minimumTopicsToSelectValidator } from '../minimum-topics-to-select.validator';

@Component({
  selector: 'app-step-topics',
  templateUrl: './step-topics.component.html',
  styleUrls: ['./step-topics.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StepTopicsComponent implements OnInit {
  @Output() next = new EventEmitter();
  form: FormGroup;
  topics = new Array(20).fill(0).map((_, index) => ({
    name: 'Architektur',
    imageUrl: `assets/login/small/splash (${(index % 9) + 1}).jpg`
  }));

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
    // if (this.form.valid) {
    //   this.stepsService.postGender({
    //     gender: this.form.value.gender,
    //     userDefinedGender: this.form.value.userDefinedGender,
    //   }).subscribe(() => {
    //     this.next.emit();
    //   });
    // }
  }

}
