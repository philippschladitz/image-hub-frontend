import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class APIService {
    get apiURL() {
        return environment.apiURL;
    }

    get accessToken() {
        return this._accessToken;
    }

    set accessToken(value) {
        this._accessToken = value;
        localStorage.setItem('accessToken', this._accessToken);
    }

    get expires() {
      return this._expires;
    }

    set expires(value) {
      this._expires = value;
      localStorage.setItem('expires', this._expires);
    }

    get issuedAt() {
      return this._issuedAt;
    }

    set issuedAt(value) {
      this._issuedAt = value;
      localStorage.setItem('issuedAt', this._issuedAt);
    }

    get headers() {
      return {
        authorization: `Bearer ${this.accessToken}`,
      };
    }

    private _accessToken = null;
    private _expires = null;
    private _issuedAt = null;

    constructor() {
      this._accessToken = localStorage.getItem('accessToken');
      this._expires = localStorage.getItem('expires');
      this._issuedAt = localStorage.getItem('issuedAt');
    }

    clear() {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('expires');
      localStorage.removeItem('issuedAt');
    }
}
