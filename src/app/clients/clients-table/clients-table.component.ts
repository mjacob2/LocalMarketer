import { Component, OnInit, ViewChild } from '@angular/core';
import { ClientsService } from 'src/app/services/clients.service';
import { ClientList } from 'src/app/models/clientList.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AddClientComponent } from '../add-client/add-client.component';
import {
  MatBottomSheet,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-clients-table',
  templateUrl: './clients-table.component.html',
  styleUrls: ['./clients-table.component.scss'],
})
export class ClientsTableComponent {
  displayedColumns = [
    'firstName',
    'lastName',
    'phone',
    'email',
    'source',
    'creatorId',
  ];

  dataSource!: MatTableDataSource<ClientList>;

  clients: ClientList[] = [];

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private clientsService: ClientsService,
    private _bottomSheet: MatBottomSheet
  ) {}

  async ngOnInit() {
    this.clients = await this.clientsService.getAllClients();
    this.dataSource = new MatTableDataSource(this.clients);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openAddClientBottomSheet() {
    const bottomSheetRef: MatBottomSheetRef = this._bottomSheet.open(
      AddClientComponent,
      {
        disableClose: true,
      }
    );

    bottomSheetRef.afterDismissed().subscribe(async () => {
      this.clients = await this.clientsService.getAllClients();
      this.dataSource = new MatTableDataSource(this.clients);
    });
  }
}
