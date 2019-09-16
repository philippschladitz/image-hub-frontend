import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-step-gender',
  templateUrl: './step-gender.component.html',
  styleUrls: ['./step-gender.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StepGenderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
