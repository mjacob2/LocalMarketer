import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { LocalStorageService } from './local-storage.service';
import { Buffer } from 'buffer';
import { Router } from '@angular/router';
import { XUser } from '../models/XUser.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  user: XUser | null = {};

  constructor(
    private http: HttpService,
    private localStorage: LocalStorageService,
    private router: Router
  ) {}

  async login(email: string, password: string) {
    this.user = await this.http.post<XUser>('/login', {
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
    this.user = await this.localStorage.getItem<XUser>('user');
  }
}
