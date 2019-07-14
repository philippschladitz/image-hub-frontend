import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '@app/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegistrationComponent implements OnInit {
  form: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authenticationService: AuthenticationService,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: this.formBuilder.control('', [
        Validators.required,
        Validators.email
      ]),
      password: this.formBuilder.control('', [Validators.required]),
      name: this.formBuilder.control('', [Validators.required])
    });
  }

  register() {
    if (this.form.valid) {
      this.authenticationService.register({
        email: this.form.value.email,
        password: this.form.value.password,
        name: this.form.value.name
      }).subscribe(registerResponse => {
        if (registerResponse) {
          console.log('success');
          this.router.navigateByUrl('dashboard');
        }
      });
    } else {
      console.error('form not valid');
    }
  }
}
