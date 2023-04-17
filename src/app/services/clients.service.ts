import { Injectable } from '@angular/core';
import { ClientList } from '../models/clientList.model';
import { HttpService } from './http.service';
import { Client } from '../models/client.model';

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  constructor(private http: HttpService) {}

  async getAllClients() {
    return await this.http.get<ClientList[]>('/clients');
  }

  async getClientById(id: number) {
    return await this.http.get<Client>(`/clients/${id}`);
  }

  async deleteClientById(id: number) {
    return await this.http.delete<Client>(`/clients/${id}`);
  }

  async updateClientById(client: Client) {
    return await this.http.put<Client>(`/clients/${client.id}`, client);
  }

  async addClient(client: Client) {
    return await this.http.post<Client>(`/clients`, client);
  }
}
