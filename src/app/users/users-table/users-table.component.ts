import { Component, ViewChild } from '@angular/core';
import {
  MatBottomSheet,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, MatSortable } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { GetAllUsersResponse } from 'src/app/models/responses/get-all-users.response';
import { UsersService } from 'src/app/services/users.service';
import { AddUserComponent } from '../add-user/add-user.component';
import { XUser } from 'src/app/models/XUser.model';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss'],
})
export class UsersTableComponent {
  constructor(
    private router: Router,
    private usersService: UsersService,
    private bottomSheet: MatBottomSheet,
    private http: HttpService
  ) {}

  displayedColumns = [
    'userId',
    'firstname',
    'lastname',
    'email',
    'phone',
    'role',
    'accesDenied',
    'clientsCount',
    'profilesCount',
    'toDosCount',
  ];
  dataSource = new MatTableDataSource<XUser>();
  users?: XUser[];

  count?: number;
  totalPages?: number;
  pageIndex?: number = 0;
  pageSize?: number = 20;

  queryParameter: string = '';
  queryParameterPageSize: string = `&PageSize=${this.pageSize}`;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  async ngOnInit() {
    this.queryParameter = '?';
    await this.reloadData(
      `${this.queryParameter}${this.queryParameterPageSize}`
    );
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openAddUserBottomSheet() {
    const bottomSheetRef: MatBottomSheetRef = this.bottomSheet.open(
      AddUserComponent,
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

  openUsersDetailsPage(id: string) {
    this.router.navigateByUrl(`/users/${id}`);
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
    this.users = undefined;
    this.users = await this.usersService.getAllUsers(
      `${queryParameters}${this.queryParameterPageSize}`
    );
    this.count = this.http.count;
    this.dataSource.data = this.users;
  }
}
