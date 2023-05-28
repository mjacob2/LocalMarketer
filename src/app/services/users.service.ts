import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { XUser } from '../models/XUser.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpService) {}

  async getAllUsers(queryParameters?: string) {
    return await this.http.get<XUser[]>(`/users${queryParameters}`);
  }

  async AddUser(user: XUser) {
    return await this.http.post<XUser>(`/users/addUser`, user);
  }
}
