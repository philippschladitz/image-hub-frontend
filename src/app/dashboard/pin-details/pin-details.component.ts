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

  commentsForm: FormGroup;
  isCommentsCtaEnabled = false;

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
      .subscribe(result => {});
  }
}
