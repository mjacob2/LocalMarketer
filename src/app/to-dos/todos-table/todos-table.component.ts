import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, MatSortable } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToDoList } from 'src/app/models/toDo-list.model';
import { User } from 'src/app/models/user.model';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { TodosService } from 'src/app/services/todos.service';

@Component({
  selector: 'app-todos-table',
  templateUrl: './todos-table.component.html',
  styleUrls: ['./todos-table.component.scss'],
})
export class TodosTableComponent {
  constructor(
    private router: Router,
    private todosService: TodosService,
    private localStorage: LocalStorageService
  ) {}

  displayedColumns: string[] = [];
  dataSource = new MatTableDataSource<ToDoList>();
  todos?: ToDoList[];
  currentlyLoggedUser: User | null | undefined;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort = new MatSort();

  async ngOnInit() {
    this.currentlyLoggedUser = await this.localStorage.getItem<User>('user');

    if (this.currentlyLoggedUser?.role == 'Administrator') {
      this.displayedColumns = [
        'title',
        'profileName',
        'dueDate',
        'isFinished',
        'role',
        'userFullName',
      ];
    } else {
      this.displayedColumns = ['title', 'profileName', 'dueDate', 'isFinished'];
    }

    this.todos = await this.todosService.getUnfinishedTodos();

    this.dataSource.data = this.todos;
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

  openToDoDetailsPage(id: string) {
    this.router.navigateByUrl(`/todos/${id}`);
  }
}
