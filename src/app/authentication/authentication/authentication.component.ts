import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthenticationComponent {
  registration = true;

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

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly changeDetectorRef: ChangeDetectorRef,
  ) {
    const showLogin = this.activatedRoute.snapshot.queryParams.login === 'true';
    this.registration = !showLogin;
    this.changeDetectorRef.markForCheck();
  }
}
