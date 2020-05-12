import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBulletinBoardDialogComponent } from './create-bulletin-board-dialog.component';

describe('CreateBulletinBoardDialogComponent', () => {
  let component: CreateBulletinBoardDialogComponent;
  let fixture: ComponentFixture<CreateBulletinBoardDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateBulletinBoardDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateBulletinBoardDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
