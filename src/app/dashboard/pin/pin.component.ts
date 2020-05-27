import {
  Component,
  ChangeDetectionStrategy,
  Input,
  ChangeDetectorRef,
  HostBinding,
  ViewChild,
  Output,
  EventEmitter
} from '@angular/core';
import { Pin, PinService, BulletinBoard } from '@app/shared';
import { Router } from '@angular/router';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import { CreateBulletinBoardDialogComponent } from '../create-bulletin-board-dialog/create-bulletin-board-dialog.component';
import { CreateBulletinBoardDialogData } from '../create-bulletin-board-dialog/create-bulletin-board-dialog-data';
import { filter, take } from 'rxjs/operators';

@Component({
  selector: 'app-pin',
  templateUrl: './pin.component.html',
  styleUrls: ['./pin.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PinComponent {
  @Input() pin: Pin;
  @Input() bulletinBoards: BulletinBoard[];
  @Output() bulletinBoardCreated = new EventEmitter<{}>();
  @ViewChild('pinMenuTriggerAfterBlacklist', { read: MatMenuTrigger, static: false })
  pinMenuTriggerAfterBlacklist: MatMenuTrigger;
  @ViewChild('pinMenuTrigger', { read: MatMenuTrigger, static: false }) pinMenuTrigger: MatMenuTrigger;
  @ViewChild('shareMenuTrigger', { read: MatMenuTrigger, static: false }) shareMenuTrigger: MatMenuTrigger;

  pinAskBlackListReason = false;
  blur = false;
  isMenuOpen = false;

  get imageUrl() {
    return this.pin.image;
  }

  get url() {
    return new URL(this.pin.link).host;
  }

  get topicName() {
    return this.pin.topic;
  }

  constructor(
    private readonly pinService: PinService,
    private readonly changeDetectoRef: ChangeDetectorRef,
    private readonly router: Router,
    private readonly matDialog: MatDialog
  ) {}

  blacklist() {
    this.pinService.blacklist(this.pin.id).subscribe(
      result => {
        this.pinAskBlackListReason = true;
        this.blur = true;
        setTimeout(() => {
          this.pinMenuTriggerAfterBlacklist.openMenu();
        }, 100);
        this.changeDetectoRef.markForCheck();
      },
      err => {
        console.error(err);
      }
    );
  }

  menuClosed() {
    this.isMenuOpen = false;
    this.changeDetectoRef.markForCheck();
  }

  menuOpened() {
    this.isMenuOpen = true;
    this.changeDetectoRef.markForCheck();
  }

  revertBlacklist() {
    this.pinService.revertBlacklist(this.pin.id).subscribe(
      result => {
        this.pinAskBlackListReason = false;
        this.blur = false;
        this.changeDetectoRef.markForCheck();
      },
      err => {
        console.error(err);
      }
    );
  }

  goToPinDetailsPage() {
    this.router.navigateByUrl(`dashboard/pin-details/${this.pin.id}`);
  }

  openCreateBulletinBoardDialog() {
    this.matDialog
      .open(CreateBulletinBoardDialogComponent, {
        data: {
          imageUrl: this.imageUrl,
          bulletinBoards: this.bulletinBoards
        } as CreateBulletinBoardDialogData,
        width: '900px'
      })
      .afterClosed()
      .pipe(
        take(1), // unsubscribes automatically after one take
        filter(result => result)
      )
      .subscribe(() => {
        this.bulletinBoardCreated.emit();
      });
  }
}
