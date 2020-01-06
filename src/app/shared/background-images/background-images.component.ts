import {
  Component,
  ChangeDetectionStrategy,
  Input,
  HostBinding,
  OnInit,
  OnChanges,
  ChangeDetectorRef
} from '@angular/core';

@Component({
  selector: 'app-background-images',
  templateUrl: './background-images.component.html',
  styleUrls: ['./background-images.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BackgroundImagesComponent implements OnInit, OnChanges {
  @Input() top = '0';

  @HostBinding('style.top') styleTop: string;

  private readonly smallImages = new Array(9).fill(0).map((_, index) => ({
    rowSpan: 2,
    url: `assets/login/small/splash (${index + 1}).jpg`
  }));

  private readonly mediumImages = new Array(8).fill(0).map((_, index) => ({
    rowSpan: 4,
    url: `assets/login/medium/splash (${index + 1}).jpg`
  }));

  private readonly largeImages = new Array(7).fill(0).map((_, index) => ({
    rowSpan: 6,
    url: `assets/login/large/splash (${index + 1}).jpg`
  }));

  get images() {
    return [...this.smallImages, ...this.mediumImages, ...this.largeImages];
  }

  ngOnInit() {
    this.styleTop = this.top;
  }

  ngOnChanges() {
    this.styleTop = this.top;
  }
}
