import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APIService } from '@app/core/api.service';
import { Login, LoginResponse, Register } from './interfaces';
import { tap, switchMap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class AuthenticationService {
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
                    this.apiService.accessToken = loginResponse.access_token;
                })
            );
    }

    register(register: Register) {
        return this.httpClient.post<Register>(
            `${this.apiService.apiURL}/auth/register`,
            register)
            .pipe(
              switchMap(() => this.login({
                email: register.email,
                password: register.password,
              })),
            );
    }
}
