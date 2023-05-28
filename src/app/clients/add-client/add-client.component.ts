import { Component } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';
import { XClient } from 'src/app/models/XClient.model';
import { XUser } from 'src/app/models/XUser.model';
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
  sellers: XUser[] = [];
  sellerId?: number;
  currentlyLoggedUser: XUser | null | undefined;

  pageIndex?: number = 0;
  queryParameter: string = '';
  pageSize?: number = 100;

  queryParameterPageIndex: string = `&PageIndex=${this.pageIndex}`;
  queryParameterPageSize = `&PageSize=${this.pageSize}`;

  async ngOnInit() {
    this.queryParameter = '?ShowOnlySellers=true';

    this.sellers = await this.httpUsers.getAllUsers(
      `${this.queryParameter}${this.queryParameterPageIndex}${this.queryParameterPageSize}`
    );

    this.currentlyLoggedUser = await this.localStorage.getItem<XUser>('user');
    if (this.currentlyLoggedUser?.role == 'Seller') {
      this.sellerId = this.currentlyLoggedUser?.userId;
    }
  }

  onSubmit(clientToAdd: XClient) {
    this.isLoading = true;

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
