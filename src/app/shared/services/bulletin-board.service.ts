import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APIService } from '@app/core';
import { Pin } from './pin';

@Injectable()
export class BulletinBoardService {
  constructor(private readonly httpClient: HttpClient, private readonly apiService: APIService) {}

  create(boardName: string) {
    return this.httpClient.post(
      `${this.apiService.apiURL}/bulletin-boards`,
      {
        boardName
      },
      {
        headers: this.apiService.headers
      }
    );
  }

  getAll() {
    return this.httpClient.get(`${this.apiService.apiURL}/bulletin-boards`, {
      headers: this.apiService.headers
    });
  }
}
