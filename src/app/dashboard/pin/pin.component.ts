import { Component, ChangeDetectionStrategy, Input, ChangeDetectorRef, HostBinding, ViewChild } from '@angular/core';
import { Pin, PinService } from '@app/shared';
import { Router } from '@angular/router';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-pin',
  templateUrl: './pin.component.html',
  styleUrls: ['./pin.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PinComponent {
  @Input() pin: Pin;
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
    private readonly router: Router
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
}
