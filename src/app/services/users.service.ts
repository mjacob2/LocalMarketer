import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { UserList } from '../models/user-list.model';
import { AddUSerRequestModel } from '../models/add-user-request.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpService) {}

  async getAllUsers() {
    return await this.http.get<UserList[]>('/users');
  }

  async AddUser(user: AddUSerRequestModel) {
    return await this.http.post<AddUSerRequestModel>(`/users/addUser`, user);
  }
}
