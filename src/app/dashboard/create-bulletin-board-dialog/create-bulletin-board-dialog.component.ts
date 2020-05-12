import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { CreateBulletinBoardDialogData } from './create-bulletin-board-dialog-data';
import { BulletinBoardService } from '@app/shared';

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

  get isBoardNameValid() {
    return this.bulletinBoardName && this.bulletinBoardName !== '';
  }

  bulletinBoardName: string;
  nameSuggestions = ['Vorschlag 1', 'Vorschlag 2', 'Vorschlag 3'];

  constructor(
    @Inject(MAT_DIALOG_DATA) private readonly data: CreateBulletinBoardDialogData,
    private readonly bulletinBoardService: BulletinBoardService
  ) {}

  createBulletinBoard() {
    if (this.isBoardNameValid) {
      this.bulletinBoardService.create(this.bulletinBoardName).subscribe(result => {
        console.log('result', result);
      });
    }
  }
}
