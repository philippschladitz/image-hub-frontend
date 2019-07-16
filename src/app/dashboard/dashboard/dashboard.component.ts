import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {

  smallImages = new Array(9).fill(0).map((_, index) => ({
    rowSpan: 2,
    url: `assets/login/small/splash (${index + 1}).jpg`
  }));

  mediumImages = new Array(8).fill(0).map((_, index) => ({
    rowSpan: 4,
    url: `assets/login/medium/splash (${index + 1}).jpg`
  }));

  largeImages = new Array(7).fill(0).map((_, index) => ({
    rowSpan: 6,
    url: `assets/login/large/splash (${index + 1}).jpg`
  }));

  get images() {
    return [
      ...this.smallImages,
      ...this.mediumImages,
      ...this.largeImages
    ];
  }

  constructor() { }

  ngOnInit() {
  }

}
