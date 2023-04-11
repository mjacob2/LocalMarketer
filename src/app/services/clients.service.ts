import { Injectable } from '@angular/core';
import { ClientList } from '../models/clientList.model';
import { HttpService } from './http.service';

export interface HttpServiceResponse<T> {
  data: T;
  status: number;
}

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  constructor(private http: HttpService) {}

  async getAllClients() {
    const response: ClientList[] = await this.http.get<ClientList>('/clients');
    return response;
  }
}
