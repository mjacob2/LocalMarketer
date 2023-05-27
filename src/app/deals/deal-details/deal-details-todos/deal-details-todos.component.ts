import { Component, Input } from '@angular/core';
import {
  MatBottomSheet,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';
import { AddTodoComponent } from '../../add-todo/add-todo.component';
import { XToDo } from 'src/app/models/XToDo.model';

@Component({
  selector: 'app-deal-details-todos',
  templateUrl: './deal-details-todos.component.html',
  styleUrls: ['./deal-details-todos.component.scss'],
})
export class DealDetailsTodosComponent {
  constructor(private bottomSheet: MatBottomSheet, private router: Router) {}

  @Input()
  toDos?: XToDo[];

  @Input()
  dealId?: number;

  @Input()
  dealEndDate?: Date;

  @Input()
  dealCreationDate?: Date;

  openAddToDoBottomSheet() {
    const bottomSheetRef: MatBottomSheetRef = this.bottomSheet.open(
      AddTodoComponent,
      {
        disableClose: true,
        data: {
          dealId: this.dealId,
          dealEndDate: this.dealEndDate,
          dealCreationDate: this.dealCreationDate,
        },
      }
    );
  }

  goToToDo(id?: number) {
    this.router.navigateByUrl(`/todos/${id}`);
  }
}
