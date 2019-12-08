import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationDashboardComponent } from './registration-dashboard.component';

describe('RegistrationDashboardComponent', () => {
  let component: RegistrationDashboardComponent;
  let fixture: ComponentFixture<RegistrationDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrationDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
