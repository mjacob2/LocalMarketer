import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientsTableComponent } from './clients/clients-table/clients-table.component';
import { NoTaskBarLayoutComponent } from './no-taskBar-layout.component';
import { LoginComponent } from './auth/login/login.component';
import { TaskBarLayoutComponent } from './task-bar/task-bar.component';
import { TodosTableComponent } from './to-dos/todos-table/todos-table.component';
import { ClientDetailsComponent } from './clients/client-details/client-details.component';
import { ProfilesTableComponent } from './profiles/profiles-table/profiles-table.component';
import { ProfileDetailsComponent } from './profiles/profile-details/profile-details.component';
import { DealsTableComponent } from './deals/deals-table/deals-table.component';
import { DealDetailsComponent } from './deals/deal-details/deal-details.component';
import { TodoDetailsComponent } from './to-dos/todo-details/todo-details.component';
import { FaqFormComponent } from './my-forms/faq-form/faq-form.component';

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
        path: 'clients/:id',
        component: ClientDetailsComponent,
      },
      {
        path: 'todos',
        component: TodosTableComponent,
      },
      {
        path: 'todos/:id',
        component: TodoDetailsComponent,
      },
      {
        path: 'profiles',
        component: ProfilesTableComponent,
      },
      {
        path: 'profiles/:id',
        component: ProfileDetailsComponent,
      },
      {
        path: 'deals',
        component: DealsTableComponent,
      },
      {
        path: 'deals/:id',
        component: DealDetailsComponent,
      },
      {
        path: 'forms/faq',
        component: FaqFormComponent,
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
