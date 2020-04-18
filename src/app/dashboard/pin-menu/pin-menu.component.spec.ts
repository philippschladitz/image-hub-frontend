import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PinMenuComponent } from './pin-menu.component';

describe('PinMenuComponent', () => {
  let component: PinMenuComponent;
  let fixture: ComponentFixture<PinMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PinMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PinMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
