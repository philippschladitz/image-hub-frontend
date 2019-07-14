import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APIService } from '@app/core/api.service';
import { Login, LoginResponse, Register } from './interfaces';
import { tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class AuthenticationService {
    get accessToken() {
        return this._accessToken;
    }

    private _accessToken: string;

    constructor(
        private readonly httpClient: HttpClient,
        private readonly apiService: APIService
    ) {}

    login(login: Login) {
        return this.httpClient
            .post<LoginResponse>(
                `${this.apiService.apiURL}/auth/login`,
                login)
            .pipe(
                tap(loginResponse => {
                    this._accessToken = loginResponse.access_token;
                })
            );
    }

    register(register: Register) {
        return this.httpClient.post<Register>(
            `${this.apiService.apiURL}/auth/register`,
            register);
    }
}
