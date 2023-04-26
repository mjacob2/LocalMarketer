import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { AddTodoRequestModel } from '../models/add-todo-request.model';
import { ToDoList } from '../models/toDo-list.model';
import { ToDo } from '../models/toDo.model';

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

  async getToDoById(id: number) {
    return await this.http.get<ToDo>(`/todos/${id}`);
  }

  async updateToDoById(toDo: ToDo) {
    return await this.http.put<ToDo>(`/toDos/${toDo.id}`, toDo);
  }

  async deleteToDoById(id: number) {
    return await this.http.delete<ToDo>(`/toDos/${id}`);
  }
}
