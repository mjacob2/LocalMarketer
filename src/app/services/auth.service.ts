import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Roles, User } from '../models/user.model';
import { HttpService } from './http.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpService) {}

  addUser(
    lastName: string,
    firstName: string,
    email: string,
    phone: string,
    password: string,
    role: Roles
  ) {
    return this.http.post<User>('/', {
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phone,
      password: password,
      role: role,
    });
  }

  login(email: string, password: string) {
    let hh = this.http.post<User>('/login', {
      email: email,
      password: password,
    });

    console.log(hh);
    return hh;
  }
}
