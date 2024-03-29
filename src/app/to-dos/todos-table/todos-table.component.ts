import { Component, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToDosShowOnly } from 'src/app/constants/ToDosFilter';
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

  count?: number;
  totalPages?: number;
  pageIndex?: number = 0;
  pageSize?: number = 20;
  showOnly?: string | null;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort = new MatSort();

  async ngOnInit() {
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
    this.showOnly = ToDosShowOnly.Unfinished;
    await this.loadData();
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
    this.showOnly = null;
    await this.loadData();
  }

  async getUnfinishedToDos() {
    this.showOnly = ToDosShowOnly.Unfinished;
    await this.loadData();
  }

  async getFinishedToDos() {
    this.showOnly = ToDosShowOnly.Finished;
    await this.loadData();
  }

  async handlePageEvent(e: PageEvent) {
    this.pageIndex = e.pageIndex;
    this.pageSize = e.pageSize;
    await this.loadData();
  }

  private async loadData() {
    this.todos = undefined;
    this.todos = await this.todosService.getAllTodos(
      `?PageIndex=${this.pageIndex}&PageSize=${this.pageSize}&ShowOnly=${this.showOnly}`
    );
    this.count = this.http.count;
    this.dataSource.data = this.todos;
  }

  isOverdue(dueDate: Date): boolean {
    const todayAsTime = new Date().getTime();
    const dueDateAsTime = new Date(dueDate).getTime();
    return dueDateAsTime < todayAsTime;
  }

  isThisWeekOverdue(dueDate: Date): boolean {
    const todayAsTime = new Date().getTime();
    const dueDatePlus7DaysAsTime = todayAsTime + 7 * 24 * 60 * 60 * 1000; // Adding 7 days in milliseconds
    const dueDateAsTime = new Date(dueDate).getTime();
    return dueDateAsTime < dueDatePlus7DaysAsTime;
  }
}
