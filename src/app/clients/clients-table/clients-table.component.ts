import { Component, OnInit, ViewChild } from '@angular/core';
import { ClientsService } from 'src/app/services/clients.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AddClientComponent } from '../add-client/add-client.component';
import {
  MatBottomSheet,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { XClient } from 'src/app/models/XClient.model';
import { XUser } from 'src/app/models/XUser.model';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-clients-table',
  templateUrl: './clients-table.component.html',
  styleUrls: ['./clients-table.component.scss'],
})
export class ClientsTableComponent {
  displayedColumns = [
    'name',
    'firstName',
    'lastName',
    'phone',
    'email',
    'sellerFullName',
    'localMarketerFullName',
  ];

  dataSource = new MatTableDataSource<XClient>();
  clients?: XClient[];
  clientsType?: string;
  currentlyLoggedUser: XUser | null | undefined;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private clientsService: ClientsService,
    private bottomSheet: MatBottomSheet,
    private router: Router,
    private localStorage: LocalStorageService
  ) {}

  async ngOnInit() {
    this.currentlyLoggedUser = await this.localStorage.getItem<XUser>('user');

    this.clientsType = 'all';
    this.clients = await this.clientsService.getAllClients();
    this.dataSource.data = this.clients;
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
    const bottomSheetRef: MatBottomSheetRef = this.bottomSheet.open(
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

  openClientDetailsPage(id: string) {
    this.router.navigateByUrl(`/clients/${id}`);
  }

  async getAllClients() {
    this.clients = undefined;
    this.clients = await this.clientsService.getAllClients();
    this.dataSource.data = this.clients;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  async getClientsWithoutLocalMarketer() {
    this.clients = undefined;
    this.clients = await this.clientsService.getUnallocatedClients();
    this.dataSource.data = this.clients;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
