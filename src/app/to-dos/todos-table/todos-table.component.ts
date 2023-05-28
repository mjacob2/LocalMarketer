import { Component, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { XToDo } from 'src/app/models/XToDo.model';
import { XUser } from 'src/app/models/XUser.model';
import { HttpService } from 'src/app/services/http.service';
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
    private localStorage: LocalStorageService,
    private http: HttpService
  ) {}

  displayedColumns: string[] = [];
  dataSource = new MatTableDataSource<XToDo>();
  todos?: XToDo[];
  currentlyLoggedUser: XUser | null | undefined;

  toDosType?: string;

  count?: number;
  totalPages?: number;
  pageIndex?: number = 0;
  pageSize?: number = 20;

  queryParameter: string = '';
  queryParameterPageSize: string = `&PageSize=${this.pageSize}`;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort = new MatSort();

  async ngOnInit() {
    this.toDosType = 'unfinished';

    this.currentlyLoggedUser = await this.localStorage.getItem<XUser>('user');

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

    this.queryParameter = '?ShowOnlyUnfinished=true';
    await this.reloadData(
      `${this.queryParameter}${this.queryParameterPageSize}`
    );
    //this.sort.sort({ id: 'dueDate', start: 'asc' } as MatSortable);
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

  async getAllToDos() {
    this.queryParameter = '?';
    await this.reloadData(this.queryParameter);
  }

  async getUnfinishedToDos() {
    this.queryParameter = '?ShowOnlyUnfinished=true';
    await this.reloadData(this.queryParameter);
  }

  async getFinishedToDos() {
    this.queryParameter = '?ShowOnlyFinished=true';
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
    this.todos = undefined;
    this.todos = await this.todosService.getAllTodos(
      `${queryParameters}${this.queryParameterPageSize}`
    );
    this.count = this.http.count;
    this.dataSource.data = this.todos;
  }
}
