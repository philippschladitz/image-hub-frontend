import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StepsService } from '../steps.service';

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
    return false;
    // return this.form.valid;
  }

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly stepsService: StepsService
  ) { }

  ngOnInit() {
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
