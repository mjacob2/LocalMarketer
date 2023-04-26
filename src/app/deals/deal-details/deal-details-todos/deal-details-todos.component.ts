import { Component, Input } from '@angular/core';
import {
  MatBottomSheet,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';
import { ToDoGeneral } from 'src/app/models/todoGeneral.model';
import { AddTodoComponent } from '../../add-todo/add-todo.component';

@Component({
  selector: 'app-deal-details-todos',
  templateUrl: './deal-details-todos.component.html',
  styleUrls: ['./deal-details-todos.component.scss'],
})
export class DealDetailsTodosComponent {
  constructor(private bottomSheet: MatBottomSheet, private router: Router) {}

  @Input()
  toDos?: ToDoGeneral[] = [];

  @Input()
  dealId?: number;

  @Input()
  dealEndDate?: Date;

  openAddToDoBottomSheet() {
    const bottomSheetRef: MatBottomSheetRef = this.bottomSheet.open(
      AddTodoComponent,
      {
        disableClose: true,
        data: {
          dealId: this.dealId,
          dealEndDate: this.dealEndDate,
        },
      }
    );
  }

  goToToDo(id: number) {
    console.log(id);
    this.router.navigateByUrl(`/todos/${id}`);
  }
}
