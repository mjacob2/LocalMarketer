import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientsTableComponent } from './clients/clients-table/clients-table.component';
import { NoTaskBarLayoutComponent } from './no-taskBar-layout.component';
import { LoginComponent } from './auth/login/login.component';
import { TaskBarLayoutComponent } from './task-bar/task-bar.component';
import { TodosTableComponent } from './to-dos/todos-table/todos-table.component';
import { AddClientComponent } from './clients/add-client/add-client.component';

const routes: Routes = [
  {
    path: '',
    component: TaskBarLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: '/clients',
        pathMatch: 'full',
      },
      {
        path: 'clients',
        component: ClientsTableComponent,
      },
      {
        path: 'clients/add',
        component: AddClientComponent,
      },
      {
        path: 'todos',
        component: TodosTableComponent,
      },
    ],
  },
  {
    path: '',
    component: NoTaskBarLayoutComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
    ],
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
