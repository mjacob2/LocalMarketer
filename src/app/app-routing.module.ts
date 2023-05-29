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
import { FormThxComponent } from './my-forms/form-thx/form-thx.component';
import { FaqFormViewComponent } from './my-forms/faq-form/faq-form-view/faq-form-view.component';
import { UsersTableComponent } from './users/users-table/users-table.component';
import { ServicesFormComponent } from './my-forms/services-form/services-form.component';
import { ServiceFormViewComponent } from './my-forms/services-form/service-form-view/service-form-view.component';
import { ProductsFormComponent } from './my-forms/products-form/products-form.component';
import { ProductFormViewComponent } from './my-forms/products-form/product-form-view/product-form-view.component';
import { BasicFormComponent } from './my-forms/basic-form/basic-form.component';

const routes: Routes = [
  {
    path: '',
    component: TaskBarLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: '/todos',
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
        path: 'users',
        component: UsersTableComponent,
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
      {
        path: 'forms/faq',
        component: FaqFormComponent,
      },
      {
        path: 'formfaq/:id',
        component: FaqFormViewComponent,
      },
      {
        path: 'forms/service',
        component: ServicesFormComponent,
      },
      {
        path: 'formService/:id',
        component: ServiceFormViewComponent,
      },
      {
        path: 'forms/product',
        component: ProductsFormComponent,
      },
      {
        path: 'formProduct/:id',
        component: ProductFormViewComponent,
      },
      {
        path: 'forms/basic',
        component: BasicFormComponent,
      },

      {
        path: 'forms/thx',
        component: FormThxComponent,
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
