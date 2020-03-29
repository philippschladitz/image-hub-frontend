import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PinDetailsComponent } from './pin-details.component';

describe('PinDetailsComponent', () => {
  let component: PinDetailsComponent;
  let fixture: ComponentFixture<PinDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PinDetailsComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PinDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
