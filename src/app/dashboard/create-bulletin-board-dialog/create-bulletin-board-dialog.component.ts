import { Component, ChangeDetectionStrategy, Inject, ChangeDetectorRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { CreateBulletinBoardDialogData } from './create-bulletin-board-dialog-data';
import { BulletinBoardService } from '@app/shared';
import { tap, delay } from 'rxjs/operators';

@Component({
  selector: 'app-create-bulletin-board-dialog',
  templateUrl: './create-bulletin-board-dialog.component.html',
  styleUrls: ['./create-bulletin-board-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateBulletinBoardDialogComponent {
  get imageUrl() {
    return this.data.imageUrl;
  }

  get bulletinBoards() {
    return this.data.bulletinBoards;
  }

  get isBoardNameValid() {
    return this.bulletinBoardName && this.bulletinBoardName !== '';
  }

  bulletinBoardName: string;
  nameSuggestions = ['Vorschlag 1', 'Vorschlag 2', 'Vorschlag 3'];
  showAnimation = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) private readonly data: CreateBulletinBoardDialogData,
    private readonly bulletinBoardService: BulletinBoardService,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly matDialogRef: MatDialogRef<CreateBulletinBoardDialogComponent>
  ) {}

  addToBulletinBoard(id: string) {}

  createBulletinBoard() {
    if (this.isBoardNameValid) {
      this.bulletinBoardService
        .create(this.bulletinBoardName)
        .pipe(
          tap(() => {
            this.showAnimation = true;
            this.changeDetectorRef.markForCheck();
          }),
          delay(1000)
        )
        .subscribe(result => {
          this.matDialogRef.close(result);
        });
    }
  }
}
