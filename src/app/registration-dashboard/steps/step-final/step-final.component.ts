import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-step-final',
  templateUrl: './step-final.component.html',
  styleUrls: ['./step-final.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StepFinalComponent implements OnInit {

  rectangles = new Array(10).fill(0);

  constructor() { }

  ngOnInit() {
  }

}
