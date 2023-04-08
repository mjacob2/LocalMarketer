import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodosTableComponent } from './todos-table/todos-table.component';
import { TodosRoutingModule } from './todos-routing.module';

@NgModule({
  declarations: [TodosTableComponent],
  imports: [CommonModule, TodosRoutingModule],
})
export class ToDosModule {}
