import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APIService } from '@app/core';
import { Observable } from 'rxjs';

@Injectable()
export class StepsService {
  constructor(private readonly httpClient: HttpClient, private readonly apiService: APIService) {}

  getAvailableTopics() {
    return this.httpClient.get<
      {
        id: string;
        imageUrl: string;
      }[]
    >(`${this.apiService.apiURL}/user-facts/available-topics`);
  }

  getGender() {
    return this.httpClient.get(`${this.apiService.apiURL}/user-facts/gender`, {
      headers: this.apiService.headers
    });
  }

  getEmail() {
    return this.httpClient.get(`${this.apiService.apiURL}/user-facts/email`, {
      headers: this.apiService.headers,
      responseType: 'text'
    });
  }

  getName() {
    return this.httpClient.get(`${this.apiService.apiURL}/user-facts/name`, {
      headers: this.apiService.headers,
      responseType: 'text'
    });
  }

  getCountryAndLanguage() {
    return this.httpClient.get(`${this.apiService.apiURL}/user-facts/country`, {
      headers: this.apiService.headers
    });
  }

  getTopics() {
    return this.httpClient.get<{
      topics: {
        id: string;
        imageUrl: string;
      }[];
    }>(`${this.apiService.apiURL}/user-facts/topics`, {
      headers: this.apiService.headers
    });
  }

  postGender(body: { gender: string; userDefinedGender: string }) {
    return this.httpClient.post(`${this.apiService.apiURL}/user-facts/gender`, body, {
      headers: this.apiService.headers
    });
  }

  postName(body: { name: string }) {
    return this.httpClient.post(`${this.apiService.apiURL}/user-facts/name`, body, {
      headers: this.apiService.headers,
      responseType: 'text'
    });
  }

  postCountryAndLanguage(body: { language: string; country: string }) {
    return this.httpClient.post(`${this.apiService.apiURL}/user-facts/country`, body, {
      headers: this.apiService.headers
    });
  }

  postTopics(body: { topics: string[] }) {
    return this.httpClient.post(`${this.apiService.apiURL}/user-facts/topics`, body, {
      headers: this.apiService.headers
    });
  }
}
