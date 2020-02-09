import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StepsService } from '../../../shared';

@Component({
  selector: 'app-step-language-country',
  templateUrl: './step-language-country.component.html',
  styleUrls: ['./step-language-country.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StepLanguageCountryComponent implements OnInit {
  @Output() next = new EventEmitter();
  form: FormGroup;

  languages = [
    {
      key: 'Deutsch',
      value: 'german'
    },
    {
      key: 'Englisch',
      value: 'english'
    }
  ];

  countries = [
    {
      key: 'Deutschland',
      value: 'germany'
    },
    {
      key: 'Vereinigtes Königreich',
      value: 'united_kingdom'
    }
  ];

  get isNextEnabled() {
    return this.form.valid;
  }

  constructor(private readonly formBuilder: FormBuilder, private readonly stepsService: StepsService) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      language: this.formBuilder.control(this.languages[0].value, [Validators.required]),
      country: this.formBuilder.control(this.countries[0].value, [Validators.required])
    });
  }

  onNext() {
    if (this.form.valid) {
      this.stepsService
        .postCountryAndLanguage({
          language: this.form.value.language,
          country: this.form.value.country
        })
        .subscribe(() => {
          this.next.emit();
        });
    }
  }
}
