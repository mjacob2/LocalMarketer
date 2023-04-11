import { Component, OnInit } from '@angular/core';
import { ClientsService } from 'src/app/services/clients.service';
import { ClientList } from 'src/app/models/clientList.model';

@Component({
  selector: 'app-clients-table',
  templateUrl: './clients-table.component.html',
  styleUrls: ['./clients-table.component.scss'],
})
export class ClientsTableComponent implements OnInit {
  clients: ClientList[] = [];

  constructor(private clientsService: ClientsService) {}

  async ngOnInit() {
    this.clients = await this.clientsService.getAllClients();
  }
}
