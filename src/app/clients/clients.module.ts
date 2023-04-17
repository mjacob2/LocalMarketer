import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientsTableComponent } from './clients-table/clients-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AddClientComponent } from './add-client/add-client.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { ClientDetailsComponent } from './client-details/client-details.component';
import { ErrorCardComponent } from '../shared/error-card/error-card.component';
import { MatCardModule } from '@angular/material/card';
import { ClientDetailsProfilesComponent } from './client-details/client-details-profiles/client-details-profiles.component';
import { MatListModule } from '@angular/material/list';
import { AddProfileComponent } from './add-profile/add-profile.component';

@NgModule({
  declarations: [
    ClientsTableComponent,
    AddClientComponent,
    ClientDetailsComponent,
    ClientDetailsProfilesComponent,
    AddProfileComponent,
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
    MatBottomSheetModule,
    ErrorCardComponent,
    MatCardModule,
    MatListModule,
  ],
})
export class ClientsModule {}
