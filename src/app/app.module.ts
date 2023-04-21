import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientsModule } from './clients/clients.module';
import { ProfilesModule } from './profiles/profiles.module';
import { ToDosModule } from './to-dos/to-dos.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatNativeDateModule } from '@angular/material/core';
import { MatListModule } from '@angular/material/list';
import { AuthModule } from './auth/login.module';
import { NoTaskBarLayoutComponent } from './no-taskBar-layout.component';
import { TaskBarLayoutComponent } from './task-bar/task-bar.component';
import { ConfirmDeleteDialogComponent } from './shared/confirm-delete-dialog/confirm-delete-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DealsModule } from './deals/deals.module';

@NgModule({
  declarations: [
    AppComponent,
    NoTaskBarLayoutComponent,
    TaskBarLayoutComponent,
    ConfirmDeleteDialogComponent,
  ],
  imports: [
    BrowserModule,
    ProfilesModule,
    AppRoutingModule,
    ClientsModule,
    ToDosModule,
    DealsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatNativeDateModule,
    MatListModule,
    HttpClientModule,
    AuthModule,
    MatDialogModule,
    MatCardModule,
    MatSnackBarModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
