import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanLoad, UrlSegment, Route, Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { map, catchError } from 'rxjs/operators';
import { APIService } from '../api.service';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistrationGuard implements CanActivate, CanLoad {
  constructor(
    private readonly apiService: APIService,
    private readonly authenticationService: AuthenticationService,
    private readonly router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    if (!this.apiService.accessToken) {
      return of(false);
    }

    const now = Date.now();
    const expired = parseInt(this.apiService.issuedAt, 10) + parseInt(this.apiService.expires, 10);

    if (now > expired) {
      this.apiService.clear();
      return of(false);
    }

    return this.authenticationService.isRegistrationFlowFinished().pipe(
      map(result => !result),
    );
  }

  canLoad(route: Route, segments: UrlSegment[]) {
    return this.canActivate(null, null).pipe(
      map(result => {
        if (!result) {
          this.router.navigateByUrl('auth');
          return false;
        }
        return result;
      }),
      catchError(() => {
        this.router.navigateByUrl('auth');
        return of(false);
      })
    );
  }
}
