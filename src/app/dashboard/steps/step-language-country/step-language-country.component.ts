import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-step-language-country',
  templateUrl: './step-language-country.component.html',
  styleUrls: ['./step-language-country.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StepLanguageCountryComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  onNext() {}

}
