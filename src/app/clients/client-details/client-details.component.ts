import { Component } from '@angular/core';
import { ClientsService } from 'src/app/services/clients.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ConfirmDeleteDialogComponent } from 'src/app/shared/confirm-delete-dialog/confirm-delete-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsersService } from 'src/app/services/users.service';
import { ClientUser } from 'src/app/models/ClientUser.model';
import { XClient } from 'src/app/models/XClient.model';
import { XUser } from 'src/app/models/XUser.model';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.scss'],
})
export class ClientDetailsComponent {
  errorMessage: string = '';
  isLoading = false;
  client: XClient = new XClient();
  clientId!: number;
  allUsers: XUser[] = [];
  usersRelatedToClient: XUser[] = [];
  sellerId: number | null | undefined;
  userId: number | null | undefined;
  allSellers: XUser[] | undefined;
  allLocalMarketers: XUser[] | undefined;

  pageIndex?: number = 0;
  pageSize?: number = 100;
  queryParameter: string = '?';
  queryParameterPageIndex: string = `&PageIndex=${this.pageIndex}`;
  queryParameterPageSize = `&PageSize=${this.pageSize}`;

  constructor(
    private service: ClientsService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private httpUsers: UsersService
  ) {}

  async ngOnInit() {
    this.isLoading = true;

    this.route.params.subscribe(async (params: Params) => {
      this.clientId = params['id'];
    });

    this.client = await this.service.getClientById(this.clientId);

    const usersRelatedToClient = this.client.users;
    const sellerRelatedToClient = usersRelatedToClient?.find(
      (user) => user.role === 'Seller'
    );
    this.sellerId = sellerRelatedToClient?.userId;
    const userRelatedToClient = usersRelatedToClient?.find(
      (user) => user.role !== 'Seller'
    );
    this.userId = userRelatedToClient?.userId;

    this.allUsers = await this.httpUsers.getAllUsers(
      `${this.queryParameter}${this.queryParameterPageIndex}${this.queryParameterPageSize}`
    );
    this.allSellers = this.allUsers.filter((user) => user.role === 'Seller');
    this.allLocalMarketers = this.allUsers.filter(
      (user) => user.role === 'LocalMarketer'
    );

    this.isLoading = false;
  }

  saveChanges() {
    this.isLoading = true;

    const clientUsers: ClientUser[] = [
      {
        //ClientId: this.clientId,
        UserId: this.sellerId,
      },
      {
        //ClientId: this.clientId,
        UserId: this.userId,
      },
    ];

    this.client.clientUsers = clientUsers;

    this.service
      .updateClientById(this.client)
      .then(() => {
        this.errorMessage = '';
        this.isLoading = false;
        this.snackBar.open('Zmiany zostały zapisane', 'Ok', {
          duration: 3000,
          panelClass: ['success-snackbar'],
        });
      })
      .catch((error) => {
        this.isLoading = false;
        this.errorMessage = error.message;
      });
  }

  deleteClient() {
    this.service
      .deleteClientById(this.clientId)
      .then(() => {
        this.errorMessage = '';
        this.isLoading = false;
        this.snackBar.open('Klient został usunięty', 'Ok', {
          duration: 3000,
          panelClass: ['success-snackbar'],
        });
        this.router.navigateByUrl('/clients');
      })
      .catch((error) => {
        this.isLoading = false;
        this.errorMessage = error.message;
      });
  }

  openConfirmdDleteDialog() {
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent);
    dialogRef.componentInstance.onDelete.subscribe(() => {
      this.deleteClient();
    });
  }
}
