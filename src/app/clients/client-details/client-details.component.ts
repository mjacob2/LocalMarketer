import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ClientsService } from 'src/app/services/clients.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Client } from 'src/app/models/client.model';
import { ConfirmDeleteDialogComponent } from 'src/app/shared/confirm-delete-dialog/confirm-delete-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProfileGeneral } from 'src/app/models/profileGeneral.model';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.scss'],
})
export class ClientDetailsComponent {
  errorMessage: string = '';
  isLoading = false;

  client!: Client;
  profiles?: ProfileGeneral[] = [];

  firstName: string = '';
  lastName: string = '';
  phone: string = '';
  email: string = '';
  source: string = '';
  description: string = '';
  id: number = 0;
  creationDate?: Date;

  constructor(
    private clientsService: ClientsService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  async ngOnInit() {
    this.route.params.subscribe(async (params: Params) => {
      this.id = params['id'];
      this.client = await this.clientsService.getClientById(this.id);
      this.profiles = this.client.profiles;
      this.firstName = this.client.firstName;
      this.lastName = this.client.lastName;
      this.phone = this.client.phone;
      this.email = this.client.email;
      this.source = this.client.source;
      this.description = this.client.description;
      this.creationDate = this.client.creationDate;
    });
  }

  saveChanges(form: NgForm) {
    this.isLoading = true;
    this.client.firstName = this.firstName;
    this.client.lastName = this.lastName;
    this.client.phone = this.phone;
    this.client.email = this.email;
    this.client.source = this.source;
    this.client.description = this.description;

    this.clientsService
      .updateClientById(this.client)
      .then(() => {
        this.errorMessage = '';
        this.isLoading = false;
        this.snackBar.open('Zmiany zostały zapisane', 'Ok', {
          duration: 2000,
          panelClass: ['success-snackbar'],
        });
      })
      .catch((error) => {
        this.isLoading = false;
        this.errorMessage = error.message;
      });
  }

  deleteClient() {
    this.clientsService.deleteClientById(this.id);
    this.router.navigateByUrl('/clients');
  }

  openConfirmdDleteDialog() {
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent);
    dialogRef.componentInstance.onDelete.subscribe(() => {
      this.deleteClient();
    });
  }
}
