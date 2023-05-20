import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToDo } from 'src/app/models/toDo.model';
import { TodosService } from 'src/app/services/todos.service';
import { ConfirmDeleteDialogComponent } from 'src/app/shared/confirm-delete-dialog/confirm-delete-dialog.component';

@Component({
  selector: 'app-todo-details',
  templateUrl: './todo-details.component.html',
  styleUrls: ['./todo-details.component.scss'],
})
export class TodoDetailsComponent {
  constructor(
    private service: TodosService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  errorMessage: string = '';
  isLoading = false;
  toDo: ToDo = new ToDo();
  id!: number;

  async ngOnInit() {
    this.isLoading = true;

    this.route.params.subscribe(async (params: Params) => {
      this.id = params['id'];
      this.toDo = await this.service.getToDoById(this.id);
      console.log('todo z bazy:');
      console.log(this.toDo);

      this.isLoading = false;
    });
  }

  saveChanges() {
    console.log('todo do bazy:');
    console.log(this.toDo);

    this.isLoading = true;

    this.service
      .updateToDoById(this.toDo)
      .then(() => {
        this.errorMessage = '';
        this.isLoading = false;
        this.snackBar.open('Zmiany zostały zapisane', 'Ok', {
          duration: 3000,
          panelClass: ['success-snackbar'],
        });
      })
      .catch((error) => {
        this.isLoading = false;
        this.errorMessage = error.message;
      });
  }

  deleteToDo() {
    this.service.deleteToDoById(this.id);
    this.router.navigateByUrl('/todos');
  }

  openConfirmdDleteDialog() {
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent);
    dialogRef.componentInstance.onDelete.subscribe(() => {
      this.deleteToDo();
    });
  }
}
