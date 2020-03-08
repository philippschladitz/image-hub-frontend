import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PinOverviewComponent } from './pin-overview.component';

describe('PinOverviewComponent', () => {
  let component: PinOverviewComponent;
  let fixture: ComponentFixture<PinOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PinOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PinOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
