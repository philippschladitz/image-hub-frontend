import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn } from '@angular/forms';
import { StepsService } from '../steps.service';

@Component({
  selector: 'app-step-gender',
  templateUrl: './step-gender.component.html',
  styleUrls: ['./step-gender.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StepGenderComponent {
  @Output() next = new EventEmitter();
  form: FormGroup;

  get isNextEnabled() {
    return this.form.valid;
  }

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly stepsService: StepsService
    ) {
    this.form = formBuilder.group({
      gender: formBuilder.control('', [Validators.required]),
      userDefinedGender: formBuilder.control('')
    }, {
      validators: [this.userDefinedGenderValidator()]
    });
  }

  isGenderUserDefined() {
    return this.form.get('gender').value === 'userDefined';
  }

  onNext() {
    if (this.form.valid) {
      this.stepsService.postGender({
        gender: this.form.value.gender,
        userDefinedGender: this.form.value.userDefinedGender,
      }).subscribe(() => {
        this.next.emit();
      });
    }
  }

  // define a validation function which returns an object with an error-value if the validation failed
  private userDefinedGenderValidator(): ValidatorFn {
    return (group: FormGroup) => group.get('gender').value === 'userDefined' &&
      group.get('userDefinedGender').value === '' ? {
        userDefinedGenderNotProvided: true
      } : null;
  }
}
