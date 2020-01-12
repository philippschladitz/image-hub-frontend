import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { AuthenticationCardComponent } from '../authentication-card/authentication-card.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '@app/core';
import { of, throwError } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  const loginResponse = {
    status: 200
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent, AuthenticationCardComponent],
      imports: [
        HttpClientModule,
        NoopAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatButtonModule,
        MatCardModule,
        MatSnackBarModule,
        RouterTestingModule
      ],
      providers: [
        {
          provide: AuthenticationService,
          useValue: {
            login: login => of(loginResponse)
          } as AuthenticationService
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    loginResponse.status = 200;
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  fit('should have email error', () => {
    component.form.patchValue({
      email: 'wrongEmail'
    });
    component.form.get('email').markAsDirty();
    fixture.detectChanges();

    expect(component.showEmailError).toBeTruthy();
    expect(component.form.value.email).toEqual('wrongEmail');
  });

  fit('should have password required error', () => {
    component.form.patchValue({
      email: 'correct@email.de'
    });
    component.form.markAsDirty();

    fixture.detectChanges();
    expect(component.form.valid).toBeFalsy();
    expect(component.form.get('password').errors.required).toBeTruthy();
  });

  fit('should login', () => {
    component.form.patchValue({
      email: 'correct@email.de',
      password: 'password'
    });
    fixture.detectChanges();

    const router = TestBed.get(Router) as Router;
    spyOn(router, 'navigateByUrl');

    fixture.debugElement.query(By.css('button')).nativeElement.click();

    expect(component.form.valid).toBeTruthy();
    expect(router.navigateByUrl).toHaveBeenCalled();
  });

  fit('should show snackbar with wrong email or password', () => {
    loginResponse.status = 401;
    component.form.patchValue({
      email: 'correct@email.de',
      password: 'password'
    });
    fixture.detectChanges();

    const snackBar = TestBed.get(MatSnackBar) as MatSnackBar;
    spyOn(snackBar, 'open');
    fixture.debugElement.query(By.css('button')).nativeElement.click();

    expect(component.form.valid).toBeTruthy();
    expect(snackBar.open).toHaveBeenCalled();
  });

  fit('should show snackbar with server unavailable', () => {
    component.form.patchValue({
      email: 'correct@email.de',
      password: 'password'
    });
    fixture.detectChanges();

    const snackBar = TestBed.get(MatSnackBar) as MatSnackBar;
    spyOn(snackBar, 'open');

    const authenticationService = TestBed.get(AuthenticationService) as AuthenticationService;
    spyOn(authenticationService, 'login').and.returnValue(throwError('server error'));

    fixture.debugElement.query(By.css('button')).nativeElement.click();

    expect(component.form.valid).toBeTruthy();
    expect(snackBar.open).toHaveBeenCalled();
  });

  fit('should show missing password and email snackbar', () => {
    component.form.patchValue({
      email: 'wrongemail',
      password: ''
    });
    fixture.detectChanges();

    const snackBar = TestBed.get(MatSnackBar) as MatSnackBar;
    spyOn(snackBar, 'open');

    fixture.debugElement.query(By.css('button')).nativeElement.click();

    expect(component.form.valid).toBeFalsy();
    expect(snackBar.open).toHaveBeenCalled();
  });
});
