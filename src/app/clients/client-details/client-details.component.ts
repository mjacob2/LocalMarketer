import { Component } from '@angular/core';
import { ClientsService } from 'src/app/services/clients.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Client } from 'src/app/models/client.model';
import { ConfirmDeleteDialogComponent } from 'src/app/shared/confirm-delete-dialog/confirm-delete-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.scss'],
})
export class ClientDetailsComponent {
  errorMessage: string = '';
  isLoading = false;
  client: Client = new Client();
  clientId!: number;

  constructor(
    private service: ClientsService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  async ngOnInit() {
    this.isLoading = true;
    this.route.params.subscribe(async (params: Params) => {
      this.clientId = params['id'];
      this.client = await this.service.getClientById(this.clientId);
      console.log(this.client);
      this.isLoading = false;
    });
  }

  saveChanges() {
    this.isLoading = true;

    this.service
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
    this.service.deleteClientById(this.clientId);
    this.router.navigateByUrl('/clients');
  }

  openConfirmdDleteDialog() {
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent);
    dialogRef.componentInstance.onDelete.subscribe(() => {
      this.deleteClient();
    });
  }
}
