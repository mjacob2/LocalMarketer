import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, MatSortable } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { UserList } from 'src/app/models/user-list.model';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss'],
})
export class UsersTableComponent {
  constructor(private router: Router, private usersService: UsersService) {}

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
  dataSource = new MatTableDataSource();
  users: UserList[] = [];

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  async ngOnInit() {
    const users = await this.usersService.getAllUsers();
    this.dataSource.data = users;
    this.sort.sort({ id: 'dueDate', start: 'asc' } as MatSortable);
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

  openUsersDetailsPage(id: string) {
    this.router.navigateByUrl(`/users/${id}`);
  }
}
