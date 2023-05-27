import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DealsTableComponent } from './deals-table/deals-table.component';
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
import { DealDetailsComponent } from './deal-details/deal-details.component';
import { DealDetailsTodosComponent } from './deal-details/deal-details-todos/deal-details-todos.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { AddTodoComponent } from './add-todo/add-todo.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    DealsTableComponent,
    DealDetailsComponent,
    DealDetailsTodosComponent,
    AddTodoComponent,
  ],
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
    MatCheckboxModule,
    MatSelectModule,
  ],
})
export class DealsModule {}
