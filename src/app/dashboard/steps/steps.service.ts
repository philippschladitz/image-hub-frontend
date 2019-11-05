import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APIService } from '@app/core';

@Injectable()
export class StepsService {
  private get headers() {
    return {
      authorization: `Bearer ${this.apiService.accessToken}`,
    };
  }

  constructor(
    private readonly httpClient: HttpClient,
    private readonly apiService: APIService
  ) { }

  getGender() {
    return this.httpClient.get(`${this.apiService.apiURL}/user-facts/gender`, {
      headers: this.headers
    });
  }

  getCountryAndLanguage() {
    return this.httpClient.get(`${this.apiService.apiURL}/user-facts/country`, {
      headers: this.headers
    });
  }

  getTopics() {
    return this.httpClient.get(`${this.apiService.apiURL}/user-facts/topics`, {
      headers: this.headers
    });
  }

  postGender(body: { gender: string; userDefinedGender: string; }) {
    return this.httpClient.post(`${this.apiService.apiURL}/user-facts/gender`,
      body,
     {
      headers: this.headers,
    });
  }

  postCountryAndLanguage(body: { language: string; country: string; }) {
    return this.httpClient.post(`${this.apiService.apiURL}/user-facts/country`,
    body,
    {
      headers: this.headers
    });
  }

  postTopics(body: { topics: string[]; }) {
    return this.httpClient.post(`${this.apiService.apiURL}/user-facts/topics`,
    body,
    {
      headers: this.headers
    });
  }


}
