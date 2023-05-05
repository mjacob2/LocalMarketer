import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, MatSortable } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToDoList } from 'src/app/models/toDo-list.model';
import { TodosService } from 'src/app/services/todos.service';

@Component({
  selector: 'app-todos-table',
  templateUrl: './todos-table.component.html',
  styleUrls: ['./todos-table.component.scss'],
})
export class TodosTableComponent {
  displayedColumns = [
    'title',
    'profileName',
    'dueDate',
    'isFinished',
    'userFullName',
  ];
  dataSource = new MatTableDataSource();
  todos: ToDoList[] = [];

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private router: Router, private todosService: TodosService) {}

  async ngOnInit() {
    const todos = await this.todosService.getUnfinishedTodos();
    this.dataSource.data = todos;
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
