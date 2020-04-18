import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareMenuComponent } from './share-menu.component';

describe('ShareMenuComponent', () => {
  let component: ShareMenuComponent;
  let fixture: ComponentFixture<ShareMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShareMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
