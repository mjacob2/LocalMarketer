import { Component, Inject } from '@angular/core';
import {
  MAT_BOTTOM_SHEET_DATA,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { AddDealRequestModel } from 'src/app/models/add-deal-request.model';
import { Package } from 'src/app/models/package.model';
import { User } from 'src/app/models/user.model';
import { DealsService } from 'src/app/services/deals.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { PackagesService } from 'src/app/services/packages.service';
import { UsersService } from 'src/app/services/users.service';
import { Params } from '@angular/router';

@Component({
  selector: 'app-add-deal',
  templateUrl: './add-deal.component.html',
  styleUrls: ['./add-deal.component.scss'],
})
export class AddDealComponent {
  errorMessage: string = '';
  isLoading = false;
  packages: Package[] = [];
  users: User[] = [];
  currentlyLoggedUser: User | null | undefined;
  profileId!: number;
  profileName!: string;
  clientEmail!: string;
  sellerId: number | null | undefined;
  packageId: number | null | undefined;
  foods: any[] = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' },
  ];

  constructor(
    private _bottomSheetRef: MatBottomSheetRef<AddDealComponent>,
    private http: DealsService,
    private httpPackages: PackagesService,
    private httpUsers: UsersService,
    private localStorage: LocalStorageService,

    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any
  ) {
    this.profileId = data.profileId;
    this.profileName = data.profileName;
    this.clientEmail = data.clientEmail;
  }

  async ngOnInit() {
    this.packages = await this.httpPackages.getAllPackages();

    this.users = await this.httpUsers.getAllUsers();
    this.currentlyLoggedUser = await this.localStorage.getItem<User>('user');
    if (this.currentlyLoggedUser?.role == 'Seller') {
      this.sellerId = this.currentlyLoggedUser?.id;
    }
  }

  addDeal(dealToAdd: AddDealRequestModel) {
    console.log(dealToAdd);

    this.isLoading = true;

    dealToAdd.profileId = this.profileId;
    dealToAdd.sellerFullName = `${this.currentlyLoggedUser?.firstName} ${this.currentlyLoggedUser?.lastName}`;
    dealToAdd.sellerId = this.currentlyLoggedUser?.id;
    dealToAdd.selectedPackage = this.packages.find(
      (x) => x.packageId === this.packageId
    );
    dealToAdd.name = `${dealToAdd.selectedPackage?.name} - ${this.profileName}`;
    dealToAdd.profileName = this.profileName;
    dealToAdd.clientEmail = this.clientEmail;

    const selectedseller = this.users.find((x) => x.id === this.sellerId);

    this.http
      .addDeal(dealToAdd)
      .then(() => {
        this._bottomSheetRef.dismiss();
        this.isLoading = false;
        window.location.reload();
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
