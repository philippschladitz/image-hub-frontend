import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  CanLoad,
  Route,
  UrlSegment,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { APIService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private readonly apiService: APIService, private readonly router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const now = Date.now();
    const expired = parseInt(this.apiService.issuedAt, 10) + parseInt(this.apiService.expires, 10);

    if (now > expired) {
      this.apiService.clear();
    }

    return this.apiService.accessToken !== undefined && this.apiService.accessToken !== null && now <= expired;
  }

  canLoad(route: Route, segments: UrlSegment[]) {
    const result = this.canActivate(null, null);
    if (!result) {
      this.router.navigateByUrl('auth');
    }
    return result;
  }
}
