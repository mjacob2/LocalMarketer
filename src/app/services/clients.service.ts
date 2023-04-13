import { Injectable } from '@angular/core';
import { ClientList } from '../models/clientList.model';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  constructor(private http: HttpService) {}

  async getAllClients() {
    return await this.http.get<ClientList[]>('/clients');
  }
}
