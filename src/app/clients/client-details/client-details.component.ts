import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ClientsService } from 'src/app/services/clients.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Client } from 'src/app/models/client.model';
import { HttpService } from 'src/app/services/http.service';
import { ConfirmDeleteDialogComponent } from 'src/app/shared/confirm-delete-dialog/confirm-delete-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.scss'],
})
export class ClientDetailsComponent {
  errorMessage: string = '';
  isLoading = false;

  client: Client | undefined;

  firstName: string | undefined;
  lastName: string | undefined;
  phone: string | undefined;
  email: string | undefined;
  source: string | undefined;
  description: string | undefined;
  id: any;

  constructor(
    private clientsService: ClientsService,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpService,
    public dialog: MatDialog
  ) {}

  async ngOnInit() {
    this.route.params.subscribe(async (params: Params) => {
      this.id = params['id'];
      this.client = await this.clientsService.getClientById(this.id);
      this.firstName = this.client.firstName;
      this.lastName = this.client.lastName;
      this.phone = this.client.phone;
      this.email = this.client.email;
      this.source = this.client.source;
      this.description = this.client.description;
    });
  }

  onSubmit(form: NgForm) {
    this.http
      .post('/clients', this.client)
      .then(() => {
        this.isLoading = false;
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

  openconfirmdeleteDialog() {
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent);
    dialogRef.componentInstance.onDelete.subscribe(() => {
      this.deleteClient();
    });
  }
}
