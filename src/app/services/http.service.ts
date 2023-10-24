import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { XUser } from '../models/XUser.model';

interface ApiResponse<T> {
  responseData: T;
  error: string | null;
  count?: number;
}

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  baseUrl: string = 'https://localhost:7114';
  //baseUrl: string = 'https://localmarketering.azurewebsites.net/';

  constructor(private localStorage: LocalStorageService) {}

  count?: number;
  totalPages?: number;
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;

  async request<T>(method: string, url: string, body?: any): Promise<T> {
    let authHeader: string = 'Basic';

    const user = await this.localStorage.getItem<XUser>('user');

    if (user != null) {
      authHeader = `Basic ${`${user.authData}`}`;
    }

    let response = await fetch(`${this.baseUrl}${url}`, {
      method,
      body: body ? JSON.stringify(body) : undefined,
      headers: {
        'Content-Type': 'application/json',
        Authorization: authHeader,
      },
    });

    const data: ApiResponse<T> = await response.json();

    if (!response.ok) {
      throw new Error(`${data.error}`);
    }

    this.count = data.count;

    return data.responseData;
  }

  async get<T>(url: string): Promise<T> {
    return this.request<T>('GET', url);
  }

  async post<T>(url: string, body: any): Promise<T> {
    return this.request<T>('POST', url, body);
  }

  async put<T>(url: string, body: any): Promise<T> {
    return this.request<T>('PUT', url, body);
  }

  async patch<T>(url: string, body: any): Promise<T> {
    return this.request<T>('PATCH', url, body);
  }

  async delete<T>(url: string): Promise<T> {
    return this.request<T>('DELETE', url);
  }
}
