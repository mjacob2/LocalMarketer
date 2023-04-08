import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientsTableComponent } from './clients-table/clients-table.component';

const clientsRoutes: Routes = [
  { path: 'clients', component: ClientsTableComponent },
];

@NgModule({
  imports: [RouterModule.forChild(clientsRoutes)],
  exports: [RouterModule],
})
export class ClientsRoutingModule {}
