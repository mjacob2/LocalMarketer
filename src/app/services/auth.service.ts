import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { HttpService } from './http.service';
import { LocalStorageService } from './local-storage.service';
import { Buffer } from 'buffer';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  user: User | null = {};

  constructor(
    private http: HttpService,
    private localStorage: LocalStorageService,
    private router: Router
  ) {}

  async login(email: string, password: string) {
    this.user = await this.http.post<User>('/login', {
      email: email,
      password: password,
    });
    this.user.authData = Buffer.from(`${email}:${password}`).toString('base64');
    await this.localStorage.setItem('user', this.user);
  }

  async logout(): Promise<void> {
    this.user = null;
    await this.localStorage.removeItem('user');
    this.router.navigateByUrl('/login');
  }

  async initialize() {
    this.user = await this.localStorage.getItem<User>('user');
  }
}
