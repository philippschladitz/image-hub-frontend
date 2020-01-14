import { AuthGuard } from './auth.guard';
import { APIService } from '../api.service';
import { Router } from '@angular/router';

describe('AuthGuard', () => {
  let apiService: APIService;
  let router: Router;
  let authGuard: AuthGuard;

  beforeEach(() => {
    apiService = {
      clear: () => {},
      issuedAt: '10000',
      expires: '2000',
      accessToken: 'testAccessToken'
    } as APIService;

    router = {
      navigateByUrl: url => {}
    } as Router;

    authGuard = new AuthGuard(apiService, router);
  });

  it('should return true on activate', () => {
    // the access token is valid if it is defined and not expired
    apiService.issuedAt = Date.now().toString();
    apiService.expires = '10000';

    expect(authGuard.canActivate(null, null)).toBeTruthy();
  });

  it('should return false on activate if access token undefined', () => {
    apiService.accessToken = undefined;
    expect(authGuard.canActivate(null, null)).toBeFalsy();
  });

  it('should return false on activate if access token null', () => {
    apiService.accessToken = null;
    expect(authGuard.canActivate(null, null)).toBeFalsy();
  });

  it('should return false on activate if access token is expired', () => {
    apiService.issuedAt = (Date.now() - 10000).toString();
    apiService.expires = '5000';
    expect(authGuard.canActivate(null, null)).toBeFalsy();
  });

  it('should return true on load', () => {
    apiService.issuedAt = Date.now().toString();
    apiService.expires = '10000';
    expect(authGuard.canLoad(null, null)).toBeTruthy();
  });

  it('should navigate to auth on canLoad if activation fails', () => {
    apiService.accessToken = undefined;
    spyOn(router, 'navigateByUrl').and.callThrough();
    authGuard.canLoad(null, null);
    expect(router.navigateByUrl).toHaveBeenCalled();
  });
});
