import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTopicsDialogComponent } from './edit-topics-dialog.component';

describe('EditTopicsDialogComponent', () => {
  let component: EditTopicsDialogComponent;
  let fixture: ComponentFixture<EditTopicsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditTopicsDialogComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTopicsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
