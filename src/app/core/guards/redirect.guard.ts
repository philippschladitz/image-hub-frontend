import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { RegistrationGuard } from './registration.guard';

@Injectable({
  providedIn: 'root'
})
export class RedirectGuard implements CanActivate {
  constructor(
    private readonly authGuard: AuthGuard,
    private readonly registrationGuard: RegistrationGuard,
    private readonly router: Router,
  ) {}

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
      const registrationFlowResult = await this.registrationGuard.canActivate(next, state).toPromise();
      if (registrationFlowResult) {
        this.router.navigateByUrl('registration-dashboard');
        return true;
      }

      const authResult = this.authGuard.canActivate(next, state);
      if (authResult) {
        this.router.navigateByUrl('dashboard');
        return true;
      }

      this.router.navigateByUrl('auth');
      return true;
  }
}
