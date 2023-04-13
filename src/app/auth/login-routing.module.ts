import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientsTableComponent } from '../clients/clients-table/clients-table.component';

const authsRoutes: Routes = [
  { path: 'login', component: ClientsTableComponent },
];

@NgModule({
  imports: [RouterModule.forChild(authsRoutes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
