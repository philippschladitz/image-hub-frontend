import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pin, PinService } from '@app/shared';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { UploadPhotoDialogComponent } from '../upload-photo-dialog/upload-photo-dialog.component';

@Component({
  selector: 'app-pin-details',
  templateUrl: './pin-details.component.html',
  styleUrls: ['./pin-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PinDetailsComponent implements OnInit {
  get imageUrl() {
    return this.pin.image;
  }

  get url() {
    return new URL(this.pin.link).host;
  }

  get link() {
    return this.pin.link;
  }

  get title() {
    return this.pin.title;
  }

  get description() {
    return this.pin.description;
  }

  get comments() {
    return this.pin.comments;
  }

  get commentsTabLabel() {
    return this.comments && this.comments.length > 0 ? `${this.comments.length} Kommentare` : 'Kommentare';
  }

  get photos() {
    return this.pin.photos;
  }

  get topicName() {
    return this.pin.topic;
  }

  get fourPhotos() {
    const sliced = this.pin.photos.slice(this.photosStartIndex, this.photosStartIndex + 4);
    if (sliced.length < 4) {
      const emptyPhotos = new Array(4 - sliced.length).fill(null);
      return sliced.concat(emptyPhotos);
    }
    return sliced;
  }

  get photosTabLabel() {
    return this.photos && this.photos.length > 0 ? `${this.photos.length} Fotos` : 'Fotos';
  }

  commentsForm: FormGroup;
  isCommentsCtaEnabled = false;
  photosStartIndex = 0;
  pinAskBlackListReason = false;

  private pin: Pin;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly formBuilder: FormBuilder,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly pinService: PinService,
    private readonly matDialog: MatDialog
  ) {}

  ngOnInit() {
    this.pin = this.activatedRoute.snapshot.data.pin;

    this.commentsForm = this.formBuilder.group({
      comment: this.formBuilder.control('', [Validators.required])
    });
  }

  disableCommentsCta() {
    this.isCommentsCtaEnabled = false;
    this.commentsForm.patchValue({
      comment: ''
    });
    this.commentsForm.markAsUntouched();
    this.changeDetectorRef.markForCheck();
  }

  enableCommentsCta() {
    this.isCommentsCtaEnabled = true;
    this.changeDetectorRef.markForCheck();
  }

  previousPhoto() {
    this.photosStartIndex--;

    if (this.photosStartIndex < 0) {
      this.photosStartIndex = this.photos.length - 1;
    }

    this.changeDetectorRef.markForCheck();
  }

  nextPhoto() {
    this.photosStartIndex++;

    if (this.photosStartIndex >= this.photos.length) {
      this.photosStartIndex = 0;
    }

    this.changeDetectorRef.markForCheck();
  }

  transformPhoto(base64: string) {
    return `data:image/png;base64,${base64}`;
  }

  postComment() {
    if (this.commentsForm.valid) {
      this.pinService.postComment(this.pin.id, this.commentsForm.value.comment).subscribe(
        pin => {
          this.pin = pin;
          this.commentsForm.patchValue({
            comment: ''
          });
          this.isCommentsCtaEnabled = false;

          // workaround because of a bug in angular
          this.commentsForm.markAsUntouched();
          Object.keys(this.commentsForm.controls).forEach(controlName => {
            const control = this.commentsForm.controls[controlName];
            control.reset();
            control.setErrors(null);
          });

          this.changeDetectorRef.markForCheck();
        },
        error => {}
      );
    }
  }

  openUploadPhotoDialog() {
    this.matDialog
      .open(UploadPhotoDialogComponent, {
        data: {
          pinId: this.pin.id,
          title: this.title
        }
      })
      .afterClosed()
      .subscribe((result: Pin) => {
        this.pin = result;
        this.changeDetectorRef.markForCheck();
      });
  }
}
