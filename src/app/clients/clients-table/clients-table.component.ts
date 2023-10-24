import { Component, ViewChild } from '@angular/core';
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
  currentlyLoggedUser: XUser | null | undefined;

  count?: number;
  totalPages?: number;
  pageIndex?: number = 0;
  pageSize?: number = 20;
  showOnlyUnallocaded?: boolean = false;

  wordToSearch?: string;

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
    this.currentlyLoggedUser = await this.localStorage.getItem<XUser>('user');
    await this.loadData();
  }

  search() {
    //console.log(this.wordToSearch);
    //console.log(this.queryParameter);
  }

  openAddClientBottomSheet() {
    const bottomSheetRef: MatBottomSheetRef = this.bottomSheet.open(
      AddClientComponent,
      {
        disableClose: true,
      }
    );

    bottomSheetRef.afterDismissed().subscribe(async () => {
      await this.loadData();
    });
  }

  openClientDetailsPage(id: string) {
    this.router.navigateByUrl(`/clients/${id}`);
  }

  async getAllClients() {
    this.showOnlyUnallocaded = false;
    await this.loadData();
  }

  async getClientsWithoutLocalMarketer() {
    this.showOnlyUnallocaded = true;
    await this.loadData();
  }

  async handlePageEvent(e: PageEvent) {
    this.pageIndex = e.pageIndex;
    this.pageSize = e.pageSize;
    await this.loadData();
  }

  private async loadData() {
    this.clients = undefined;
    this.clients = await this.clientsService.getAllClients(
      `?PageIndex=${this.pageIndex}&PageSize=${this.pageSize}&ShowOnlyUnallocaded=${this.showOnlyUnallocaded}`
    );
    
    this.count = this.http.count;
    this.dataSource.data = this.clients;
  }

   doSomething(a: number): number
   {
    return a * a;
   }

}
