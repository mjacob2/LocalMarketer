import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { XToDo } from '../models/XToDo.model';
@Injectable({
  providedIn: 'root',
})
export class TodosService {
  constructor(private http: HttpService) {}

  async getAllTodos(queryParameters?: string) {
    return await this.http.get<XToDo[]>(`/todos${queryParameters}`);
  }

  async addTodo(todo: XToDo) {
    return await this.http.post<XToDo>(`/todos`, todo);
  }

  async getToDoById(id: number) {
    return await this.http.get<XToDo>(`/todos/${id}`);
  }

  async updateToDoById(toDo: XToDo) {
    return await this.http.put<XToDo>(`/toDos/${toDo.toDoId}`, toDo);
  }

  async deleteToDoById(id: number) {
    return await this.http.delete<XToDo>(`/toDos/${id}`);
  }
}
