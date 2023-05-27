import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { GetAllUsersResponse } from '../models/responses/get-all-users.response';
import { AddUserRequest } from '../models/requests/add-user.request';
import { XUser } from '../models/XUser.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpService) {}

  async getAllUsers() {
    return await this.http.get<XUser[]>('/users');
  }

  async getAllSellers() {
    return await this.http.get<XUser[]>('/users?ShowOnlySellers=true');
  }

  async AddUser(user: XUser) {
    return await this.http.post<XUser>(`/users/addUser`, user);
  }
}
