import { Component } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';
import { Client } from 'src/app/models/client.model';
import { User } from 'src/app/models/user.model';
import { ClientsService } from 'src/app/services/clients.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss'],
})
export class AddClientComponent {
  constructor(
    private _bottomSheetRef: MatBottomSheetRef<AddClientComponent>,
    private http: ClientsService,
    private router: Router,
    private httpUsers: UsersService,
    private localStorage: LocalStorageService
  ) {}
  errorMessage: string = '';
  isLoading = false;
  users: User[] = [];
  sellerId: number | null | undefined;
  user: User | null | undefined;

  async ngOnInit() {
    this.users = await this.httpUsers.getAllUsers();
    this.user = await this.localStorage.getItem<User>('user');
    if (this.user?.role == 'Seller') {
      this.sellerId = this.user?.id;
    }
  }

  onSubmit(clientToAdd: Client) {
    this.isLoading = true;

    clientToAdd.sellerId = this.sellerId;
    this.http
      .addClient(clientToAdd)
      .then(() => {
        this._bottomSheetRef.dismiss();
        this.router.navigateByUrl('/clients');
        this.isLoading = false;
      })
      .catch((error) => {
        this.isLoading = false;
        this.errorMessage = error.message;
      });
  }

  close() {
    this._bottomSheetRef.dismiss();
  }
}
