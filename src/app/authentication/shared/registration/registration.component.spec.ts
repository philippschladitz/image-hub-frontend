import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientModule } from '@angular/common/http';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthenticationService } from '@app/core';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';
import { of, throwError } from 'rxjs';

import { RegistrationComponent } from './registration.component';
import { AuthenticationCardComponent } from '../authentication-card/authentication-card.component';

describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RegistrationComponent, AuthenticationCardComponent],
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
            register: registerData => of({})
          } as AuthenticationService
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have email error', () => {
    component.form.patchValue({
      email: 'wrongEmail'
    });
    component.form.get('email').markAsDirty();
    fixture.detectChanges();

    expect(component.showEmailError).toBeTruthy();
    expect(component.form.value.email).toEqual('wrongEmail');
  });

  it('should have password required error', () => {
    component.form.patchValue({
      email: 'correct@email.de'
    });
    component.form.markAsDirty();

    fixture.detectChanges();
    expect(component.form.valid).toBeFalsy();
    expect(component.form.get('password').errors.required).toBeTruthy();
  });

  it('should have password min length error', () => {
    component.form.patchValue({
      email: 'correct@email.de',
      password: '123'
    });
    component.form.markAsDirty();

    fixture.detectChanges();
    expect(component.form.valid).toBeFalsy();
    // the error is in lowercase because of angulars specification
    expect(component.form.get('password').errors.minlength).toBeTruthy();
  });

  it('should have age required error', () => {
    component.form.patchValue({
      email: 'correct@email.de',
      password: '12345678'
    });
    component.form.markAsDirty();

    fixture.detectChanges();
    expect(component.form.valid).toBeFalsy();
    expect(component.form.get('age').errors.required).toBeTruthy();
  });

  it('should have age min number error', () => {
    component.form.patchValue({
      email: 'correct@email.de',
      password: '12345678',
      age: 7
    });
    component.form.markAsDirty();

    fixture.detectChanges();
    expect(component.form.valid).toBeFalsy();
    expect(component.form.get('age').errors.min).toBeTruthy();
  });

  it('should have age min number error on negative age', () => {
    component.form.patchValue({
      email: 'correct@email.de',
      password: '12345678',
      age: -7
    });
    component.form.markAsDirty();

    fixture.detectChanges();
    expect(component.form.valid).toBeFalsy();
    expect(component.form.get('age').errors.min).toBeTruthy();
  });

  it('should register', () => {
    component.form.patchValue({
      email: 'correct@email.de',
      password: 'password',
      age: 10
    });
    fixture.detectChanges();

    const router = TestBed.get(Router) as Router;
    spyOn(router, 'navigateByUrl');

    fixture.debugElement.query(By.css('button')).nativeElement.click();

    expect(component.form.valid).toBeTruthy();
    expect(router.navigateByUrl).toHaveBeenCalled();
  });

  it('should show snackbar on failing registration', () => {
    const authenticationService = TestBed.get(AuthenticationService) as AuthenticationService;
    spyOn(authenticationService, 'register').and.returnValue(throwError('mocked error'));

    const matSnackBar = TestBed.get(MatSnackBar) as MatSnackBar;
    spyOn(matSnackBar, 'open').and.callThrough();

    component.form.patchValue({
      email: 'correct@email.de',
      password: 'password',
      age: 10
    });
    fixture.detectChanges();

    const router = TestBed.get(Router) as Router;
    spyOn(router, 'navigateByUrl');

    fixture.debugElement.query(By.css('button')).nativeElement.click();

    expect(component.form.valid).toBeTruthy();
    expect(router.navigateByUrl).not.toHaveBeenCalled();
    expect(matSnackBar.open).toHaveBeenCalled();
  });
});
