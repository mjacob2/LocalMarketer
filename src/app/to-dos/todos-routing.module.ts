import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodosTableComponent } from './todos-table/todos-table.component';

const todosRoutes: Routes = [{ path: 'todos', component: TodosTableComponent }];

@NgModule({
  imports: [RouterModule.forChild(todosRoutes)],
  exports: [RouterModule],
})
export class TodosRoutingModule {}
