import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
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
    }

    private _accessToken = null;
}