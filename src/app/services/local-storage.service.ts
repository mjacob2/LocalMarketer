import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  async setItem<T>(key: string, value: T): Promise<void> {
    await window.localStorage.setItem(key, JSON.stringify(value));
  }

  async getItem<T>(key: string): Promise<T | null> {
    const json = window.localStorage.getItem(key);

    if (json === null) {
      return null;
    }

    return JSON.parse(json);
  }

  async removeItem(key: string): Promise<void> {
    await window.localStorage.removeItem(key);
  }
}
