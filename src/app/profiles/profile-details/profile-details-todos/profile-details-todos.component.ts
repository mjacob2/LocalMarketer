import { Component, Input } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';
import { XToDo } from 'src/app/models/XToDo.model';

@Component({
  selector: 'app-profile-details-todos',
  templateUrl: './profile-details-todos.component.html',
  styleUrls: ['./profile-details-todos.component.scss'],
})
export class ProfileDetailsTodosComponent {
  constructor(private bottomSheet: MatBottomSheet, private router: Router) {}

  @Input()
  toDos?: XToDo[] = [];

  ngOnInit() {
    console.log(this.toDos);
  }

  goToTodo(id?: number) {
    console.log(id);
    this.router.navigateByUrl(`/todos/${id}`);
  }
}
