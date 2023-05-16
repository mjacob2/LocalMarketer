import { Component, ViewChild } from '@angular/core';
import {
  MatBottomSheet,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, MatSortable } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { UserList } from 'src/app/models/user-list.model';
import { UsersService } from 'src/app/services/users.service';
import { AddUserComponent } from '../add-user/add-user.component';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss'],
})
export class UsersTableComponent {
  constructor(
    private router: Router,
    private usersService: UsersService,
    private bottomSheet: MatBottomSheet
  ) {}

  displayedColumns = [
    'id',
    'firstname',
    'lastname',
    'email',
    'phone',
    'role',
    'accesDenied',
    'profilesCount',
    'toDosCount',
  ];
  dataSource = new MatTableDataSource<UserList>();
  users?: UserList[];

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  async ngOnInit() {
    this.users = await this.usersService.getAllUsers();
    this.dataSource.data = this.users;
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
      this.users = await this.usersService.getAllUsers();
      this.dataSource.data = this.users;
    });
  }

  openUsersDetailsPage(id: string) {
    this.router.navigateByUrl(`/users/${id}`);
  }
}
