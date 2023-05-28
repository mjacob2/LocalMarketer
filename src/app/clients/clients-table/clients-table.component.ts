import { Component, OnInit, ViewChild } from '@angular/core';
import { ClientsService } from 'src/app/services/clients.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
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
import { HttpService } from 'src/app/services/http.service';

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

  count?: number;
  totalPages?: number;
  pageIndex?: number = 0;
  pageSize?: number = 20;
  queryParameter: string = '';
  queryParameterPageSize: string = `&PageSize=${this.pageSize}`;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private clientsService: ClientsService,
    private bottomSheet: MatBottomSheet,
    private router: Router,
    private localStorage: LocalStorageService,
    private http: HttpService
  ) {}

  async ngOnInit() {
    this.clientsType = 'all';

    this.currentlyLoggedUser = await this.localStorage.getItem<XUser>('user');

    this.queryParameter = '?';
    await this.reloadData(
      `${this.queryParameter}${this.queryParameterPageSize}`
    );
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
      this.queryParameter = '?';
      await this.reloadData(
        `${this.queryParameter}${this.queryParameterPageSize}`
      );
    });
  }

  openClientDetailsPage(id: string) {
    this.router.navigateByUrl(`/clients/${id}`);
  }

  async getAllClients() {
    this.queryParameter = '?';
    await this.reloadData(this.queryParameter);
  }

  async getClientsWithoutLocalMarketer() {
    this.queryParameter = '?ShowOnlyUnallocaded=true';
    await this.reloadData(this.queryParameter);
  }

  async handlePageEvent(e: PageEvent) {
    this.pageIndex = e.pageIndex;
    this.pageSize = e.pageSize;

    const queryParameterPageIndex: string = `&PageIndex=${this.pageIndex}`;
    this.queryParameterPageSize = `&PageSize=${this.pageSize}`;
    await this.reloadData(
      `${this.queryParameter}${queryParameterPageIndex}${this.queryParameterPageSize}`
    );
  }

  private async reloadData(queryParameters: string) {
    this.clients = undefined;
    this.clients = await this.clientsService.getAllClients(
      `${queryParameters}${this.queryParameterPageSize}`
    );
    this.count = this.http.count;
    this.dataSource.data = this.clients;
  }
}
