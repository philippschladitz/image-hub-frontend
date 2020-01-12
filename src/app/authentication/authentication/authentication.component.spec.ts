import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivatedRoute, RouterModule } from '@angular/router';
import { By } from '@angular/platform-browser';

import { MatButtonModule } from '@angular/material/button';

import { AuthenticationComponent } from './authentication.component';
import { SharedModule as AuthenticationSharedModule } from '../shared/shared.module';
import { SharedModule } from '@app/shared';
import { HttpClientModule } from '@angular/common/http';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

describe('AuthenticationComponent', () => {
  let component: AuthenticationComponent;
  let fixture: ComponentFixture<AuthenticationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AuthenticationComponent],
      imports: [
        NoopAnimationsModule,
        HttpClientModule,
        MatButtonModule,
        RouterTestingModule,
        AuthenticationSharedModule,
        SharedModule
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              queryParams: {
                login: 'true'
              }
            }
          }
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthenticationComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should show login', () => {
    fixture.detectChanges();
    expect(component.registration).toBeFalsy();
    expect(fixture.debugElement.query(By.css('app-login'))).toBeTruthy();
  });

  it('should show registration', () => {
    const activatedRoute = TestBed.get(ActivatedRoute) as ActivatedRoute;
    activatedRoute.snapshot.queryParams.login = 'false';
    fixture.detectChanges();
    expect(component.registration).toBeTruthy();
    expect(fixture.debugElement.query(By.css('app-registration'))).toBeTruthy();
  });
});
