import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APIService } from '@app/core';
import { Pin } from './pin';

@Injectable()
export class PinService {
  constructor(private readonly httpClient: HttpClient, private readonly apiService: APIService) {}

  getPins() {
    return this.httpClient.get<Pin[]>(`${this.apiService.apiURL}/pins`, {
      headers: this.apiService.headers
    });
  }
}
