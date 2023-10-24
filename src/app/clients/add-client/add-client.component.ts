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

  async ngOnInit(): Promise<void> {
    
    this.sellers = await this.loadSellers();

    if (this.sellers.length <= 0) {
      this.errorMessage = "Brak sprzedawców!";
    }

    await this.assignSellerIdIfLoggedUserRoleIsSeller();
  }

  onSubmit(clientToAdd: XClient): void {
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

closeBottomSheet(): void {
    this._bottomSheetRef.dismiss();
  }

  private async assignSellerIdIfLoggedUserRoleIsSeller() {
    const currentlyLoggedUser = await this.localStorage.getItem<XUser>('user');
    if (currentlyLoggedUser?.role == 'Seller') {
      this.sellerId = currentlyLoggedUser?.id;
    }
  }

  private async loadSellers(): Promise<XUser[]>{
    let pageIndex: number = 0;
    let pageSize: number = 100;
    return await this.httpUsers.getAllUsers(
      `?ShowOnlySellers=true&PageIndex=${pageIndex}&PageSize=${pageSize}`
    );
  }
}
