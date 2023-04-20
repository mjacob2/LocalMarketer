import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfilesTableComponent } from './profiles-table/profiles-table.component';
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
import { ProfileDetailsComponent } from './profile-details/profile-details.component';
import { ProfileDetailsDealsComponent } from './profile-details/profile-details-deals/profile-details-deals.component';
import { MatListModule } from '@angular/material/list';
import { ProfileDetailsTodosComponent } from './profile-details/profile-details-todos/profile-details-todos.component';

@NgModule({
  declarations: [
    ProfilesTableComponent,
    ProfileDetailsComponent,
    ProfileDetailsDealsComponent,
    ProfileDetailsTodosComponent,
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatProgressBarModule,
    MatCardModule,
    ErrorCardComponent,
    FormsModule,
    ReactiveFormsModule,
    MatListModule,
  ],
})
export class ProfilesModule {}
