import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadPhotoDialogComponent } from './upload-photo-dialog.component';

describe('UploadPhotoDialogComponent', () => {
  let component: UploadPhotoDialogComponent;
  let fixture: ComponentFixture<UploadPhotoDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UploadPhotoDialogComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadPhotoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
