import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { PinService, Pin } from '@app/shared';

@Component({
  selector: 'app-pin-overview',
  templateUrl: './pin-overview.component.html',
  styleUrls: ['./pin-overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PinOverviewComponent implements OnInit {
  pins: {
    pin: Pin;
    rowSpan: number;
  }[];

  private currentRowSpan = 2;

  constructor(private readonly pinService: PinService, private readonly changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.pinService.getPins().subscribe(
      result => {
        this.pins = result.map(pin => {
          this.currentRowSpan = this.currentRowSpan === 2 ? 3 : 2;

          return {
            pin,
            rowSpan: this.currentRowSpan
          };
        });
        this.changeDetectorRef.markForCheck();
      },
      err => {
        console.log(err);
      }
    );
  }
}
