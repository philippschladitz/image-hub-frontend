import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { PinService, Pin, BulletinBoardService, BulletinBoard } from '@app/shared';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pin-overview',
  templateUrl: './pin-overview.component.html',
  styleUrls: ['./pin-overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PinOverviewComponent implements OnInit, OnDestroy {
  pins: {
    pin: Pin;
    rowSpan: number;
  }[];

  bulletinBoards: BulletinBoard[];

  private currentRowSpan = 2;
  private bulletinBoardSubscription: Subscription;

  constructor(
    private readonly pinService: PinService,
    private readonly bulletinBoardService: BulletinBoardService,
    private readonly changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadBulletinBoards();
    this.load();
  }

  ngOnDestroy() {
    this.bulletinBoardSubscription.unsubscribe();
  }

  bulletinBoardCreated() {
    if (this.bulletinBoardSubscription) {
      this.bulletinBoardSubscription.unsubscribe();
    }

    this.loadBulletinBoards();
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

  private loadBulletinBoards() {
    this.bulletinBoardSubscription = this.bulletinBoardService.getAll().subscribe(result => {
      this.bulletinBoards = result;
      this.changeDetectorRef.markForCheck();
    });
  }
}
