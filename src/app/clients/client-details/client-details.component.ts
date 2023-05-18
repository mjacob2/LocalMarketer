import { Component } from '@angular/core';
import { ClientsService } from 'src/app/services/clients.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Client } from 'src/app/models/client.model';
import { ConfirmDeleteDialogComponent } from 'src/app/shared/confirm-delete-dialog/confirm-delete-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserList } from '../../models/user-list.model';
import { ClientUser } from 'src/app/models/ClientUser.model';

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
  allUsers: User[] = [];

  usersRelatedToClient: User[] = [];
  sellerId: number | null | undefined;
  userId: number | null | undefined;
  allSellers: User[] | undefined;
  allLocalMarketers: User[] | undefined;

  constructor(
    private service: ClientsService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private httpUsers: UsersService,
    private localStorage: LocalStorageService
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
    this.sellerId = sellerRelatedToClient?.id;

    const userRelatedToClient = usersRelatedToClient?.find(
      (user) => user.role !== 'Seller'
    );
    this.userId = userRelatedToClient?.id;

    this.allUsers = await this.httpUsers.getAllUsers();
    this.allSellers = this.allUsers.filter((user) => user.role === 'Seller');
    this.allLocalMarketers = this.allUsers.filter(
      (user) => user.role === 'LocalMarketer'
    );

    this.isLoading = false;
  }

  saveChanges() {
    this.isLoading = true;

    this.client.sellerId = this.sellerId;
    this.client.userId = this.userId;

    const clientUsers: ClientUser[] = [
      {
        ClientId: 8,
        UserId: 3,
      },
      {
        ClientId: 8,
        UserId: 4,
      },
    ];

    this.client.clientUsers = clientUsers;

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
