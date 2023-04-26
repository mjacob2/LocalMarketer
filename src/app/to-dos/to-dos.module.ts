import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodosTableComponent } from './todos-table/todos-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ErrorCardComponent } from '../shared/error-card/error-card.component';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { RouterModule } from '@angular/router';
import { TodoDetailsComponent } from './todo-details/todo-details.component';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  declarations: [TodosTableComponent, TodoDetailsComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    ErrorCardComponent,
    MatCardModule,
    MatListModule,
    MatDatepickerModule,
    RouterModule,
    MatCheckboxModule,
  ],
})
export class ToDosModule {}
