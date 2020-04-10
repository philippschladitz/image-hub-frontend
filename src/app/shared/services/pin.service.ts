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

  getPin(pinId: string) {
    return this.httpClient.get<Pin>(`${this.apiService.apiURL}/pins/${pinId}`, {
      headers: this.apiService.headers
    });
  }

  blacklist(pinId: string) {
    return this.httpClient.post(
      `${this.apiService.apiURL}/pins/blacklist`,
      {
        pinId
      },
      {
        headers: this.apiService.headers
      }
    );
  }

  revertBlacklist(pinId: string) {
    return this.httpClient.delete(`${this.apiService.apiURL}/pins/blacklist/${pinId}`, {
      headers: this.apiService.headers
    });
  }

  postComment(pinId: string, comment: string) {
    return this.httpClient.post<Pin>(
      `${this.apiService.apiURL}/pins/comment/${pinId}`,
      {
        comment
      },
      {
        headers: this.apiService.headers
      }
    );
  }

  uploadPhoto(pinId: string, file: File, comment: string) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('comment', comment);

    return this.httpClient.post<Pin>(`${this.apiService.apiURL}/pins/photo/${pinId}`, formData, {
      headers: this.apiService.headers
    });
  }
}
