import { Injectable } from '@angular/core';
import { ClientList } from '../models/clientList.model';
import { HttpResponse } from '@angular/common/http';

interface ApiResponse<T> {
  responseData: T[];
  error: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  baseUrl: string = 'https://localhost:44336';
  constructor() {}

  async request<T>(method: string, url: string, body?: any): Promise<T[]> {
    const response = await fetch(`${this.baseUrl}${url}`, {
      method,
      body: body ? JSON.stringify(body) : undefined,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data: ApiResponse<T> = await response.json();

    if (!response.ok) {
      throw new Error(`${data.error}`);
    }

    return data.responseData;
  }

  async get<T>(url: string): Promise<T[]> {
    return this.request<T>('GET', url);
  }

  async post<T>(url: string, body: any): Promise<T[]> {
    return this.request<T>('POST', url, body);
  }

  async put<T>(url: string, body: any): Promise<T[]> {
    return this.request<T>('PUT', url, body);
  }

  async patch<T>(url: string, body: any): Promise<T[]> {
    return this.request<T>('PATCH', url, body);
  }

  async delete<T>(url: string): Promise<T[]> {
    return this.request<T>('DELETE', url);
  }
}
