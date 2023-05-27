import { Component, Inject } from '@angular/core';
import {
  MAT_BOTTOM_SHEET_DATA,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { XToDo } from 'src/app/models/XToDo.model';
import { TodosService } from 'src/app/services/todos.service';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss'],
})
export class AddTodoComponent {
  constructor(
    private _bottomSheetRef: MatBottomSheetRef<AddTodoComponent>,
    private http: TodosService,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any
  ) {
    this.dealId = data.dealId;
    this.dealEndDate = data.dealEndDate;
    this.profileUserId = data.profileUserId;
    this.dealCreationDate = data.dealCreationDate;
  }

  dealId!: number;
  dealEndDate!: Date;
  dealCreationDate!: Date;
  profileUserId!: number;
  errorMessage: string = '';
  isLoading = false;
  toDo = new XToDo();
  forRole?: string;
  roles: any[] = [
    { value: 'LocalMarketer', viewValue: 'Local Marketer' },
    { value: 'Seller', viewValue: 'Sprzedawca' },
  ];

  addTodo() {
    this.isLoading = true;

    this.toDo.forRole = this.forRole;
    this.toDo.dealId = this.dealId;
    this.toDo.dealEndDate = this.dealEndDate;
    this.toDo.dealCreationDate = this.dealCreationDate;

    this.http
      .addTodo(this.toDo)
      .then(() => {
        this._bottomSheetRef.dismiss();
        this.isLoading = false;
        window.location.reload();
      })
      .catch((error) => {
        this.isLoading = false;
        this.errorMessage = error.message;
      });
  }

  close() {
    this._bottomSheetRef.dismiss();
  }
}
