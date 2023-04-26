import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { DealsList } from '../models/dealsList.model';
import { AddTodoRequestModel } from '../models/add-todo-request.model';
import { ToDoList } from '../models/toDo-list.model';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  constructor(private http: HttpService) {}

  async getAllTodos() {
    return await this.http.get<ToDoList[]>('/todos');
  }

  async addTodo(todo: AddTodoRequestModel) {
    return await this.http.post<AddTodoRequestModel>(`/todos`, todo);
  }
}
