import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { XClient } from '../models/XClient.model';

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  constructor(private http: HttpService) {}

  async getAllClients(queryParameters?: string) {
    return await this.http.get<XClient[]>(`/clients${queryParameters}`);
  }

  async getClientById(id: number) {
    return await this.http.get<XClient>(`/clients/${id}`);
  }

  async deleteClientById(id: number) {
    return await this.http.delete<XClient>(`/clients/${id}`);
  }

  async updateClientById(client: XClient) {
    return await this.http.put<XClient>(`/clients/${client.clientId}`, client);
  }

  async addClient(client: XClient) {
    return await this.http.post<XClient>(`/clients`, client);
  }
}
