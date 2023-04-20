import { Component, Input } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';
import { ToDoGeneral } from 'src/app/models/todoGeneral.model';

@Component({
  selector: 'app-profile-details-todos',
  templateUrl: './profile-details-todos.component.html',
  styleUrls: ['./profile-details-todos.component.scss'],
})
export class ProfileDetailsTodosComponent {
  constructor(private bottomSheet: MatBottomSheet, private router: Router) {}
  @Input()
  toDos?: ToDoGeneral[] = [];

  openAddToDoBottomSheet() {
    /*     const bottomSheetRef: MatBottomSheetRef = this.bottomSheet.open(
      AddDealComponent,
      {
        disableClose: true,
        data: this.profileId,
      }
    ); */
  }

  goToTodo(id: number) {
    console.log(id);
    this.router.navigateByUrl(`/todos/${id}`);
  }
}
