import { Component, OnInit, ChangeDetectionStrategy, Inject, ChangeDetectorRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { PinService } from '@app/shared';

@Component({
  selector: 'app-upload-photo-dialog',
  templateUrl: './upload-photo-dialog.component.html',
  styleUrls: ['./upload-photo-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UploadPhotoDialogComponent {
  get title() {
    return this.data.title;
  }

  get isDisabled() {
    return !this.isCommentEnabled || this.comment === '' || this.comment === null || this.comment === undefined;
  }

  get isCommentEnabled() {
    return this.file !== null && this.file !== undefined;
  }

  get safeFileObjectUrl() {
    return this.domSanitizer.bypassSecurityTrustUrl(this.fileObjectUrl);
  }

  comment: string;
  file: File;
  private fileObjectUrl: string;

  constructor(
    private readonly dialogRef: MatDialogRef<UploadPhotoDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    private readonly data: {
      pinId: string;
      title: string;
    },
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly domSanitizer: DomSanitizer,
    private readonly pinService: PinService
  ) {}

  fileSelected(file: File) {
    this.file = file;
    this.fileObjectUrl = URL.createObjectURL(file);
    this.changeDetectorRef.markForCheck();
  }

  close() {
    this.dialogRef.close();
  }

  uploadPhoto() {
    this.pinService.uploadPhoto(this.data.pinId, this.file, this.comment).subscribe(result => {
      this.dialogRef.close(result);
    });
  }
}
