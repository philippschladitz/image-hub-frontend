import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '@app/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  get showEmailError() {
    return this.form.controls.email.invalid && this.form.controls.email.dirty;
  }

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authenticationService: AuthenticationService,
    private readonly matSnackBar: MatSnackBar,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: this.formBuilder.control('', [Validators.required, Validators.email]),
      password: this.formBuilder.control('', [Validators.required])
    });
  }

  login() {
    if (this.form.valid) {
      this.authenticationService
        .login({
          email: this.form.value.email,
          password: this.form.value.password
        })
        .subscribe(
          loginResponse => {
            if (loginResponse.status === 401) {
              this.matSnackBar.open('E-Mail oder Passwort falsch.', null);
            } else {
              this.router.navigateByUrl('');
            }
          },
          err => {
            this.matSnackBar.open('Der Server ist nicht erreichbar.', null, { duration: 2000 });
          }
        );
    } else {
      this.matSnackBar.open('Bitte geben Sie E-Mail und Passwort ein.', null, { duration: 2000 });
    }
  }
}
