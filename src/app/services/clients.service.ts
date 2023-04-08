import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  path: string = 'https://localhost:44336/';

  constructor(private http: HttpClient) {}

  getClients() {
    this.http.get(this.path + 'clients').subscribe((x) => {
      console.log(x);
    });
  }
}
