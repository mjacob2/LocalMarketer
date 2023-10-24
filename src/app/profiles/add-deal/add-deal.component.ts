import { Component, Inject } from '@angular/core';
import {
  MAT_BOTTOM_SHEET_DATA,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { DealsService } from 'src/app/services/deals.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { PackagesService } from 'src/app/services/packages.service';
import { UsersService } from 'src/app/services/users.service';
import { XUser } from 'src/app/models/XUser.model';
import { XPackage } from 'src/app/models/XPackage.model';
import { XDeal } from 'src/app/models/XDeal.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-deal',
  templateUrl: './add-deal.component.html',
  styleUrls: ['./add-deal.component.scss'],
})
export class AddDealComponent {
  errorMessage: string = '';
  isLoading = false;
  packages: XPackage[] = [];
  sellers: XUser[] = [];
  currentlyLoggedUser: XUser | null | undefined;
  profileId!: number;
  profileName!: string;
  clientEmail!: string;
  sellerId: number | null | undefined;
  packageId?: number;

  constructor(
    private _bottomSheetRef: MatBottomSheetRef<AddDealComponent>,
    private http: DealsService,
    private httpPackages: PackagesService,
    private httpUsers: UsersService,
    private localStorage: LocalStorageService,
    private snackBar: MatSnackBar,

    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any
  ) {
    this.profileId = data.profileId;
    this.profileName = data.profileName;
    this.clientEmail = data.clientEmail;
  }

  async ngOnInit() {
    this.packages = await this.httpPackages.getAllPackages();
    if(this.packages.length <= 0){
      this.errorMessage = 'Brak pakietów w bazie!'
    }

    this.currentlyLoggedUser = await this.localStorage.getItem<XUser>('user');
    if (this.currentlyLoggedUser?.role == 'Seller') {
      this.sellerId = this.currentlyLoggedUser?.id;
    }
  }

  addDeal(dealToAdd: XDeal) {
    console.log(dealToAdd);

    this.isLoading = true;

    dealToAdd.price = dealToAdd.price ? dealToAdd.price : 0;
    dealToAdd.profileId = this.profileId;
    //dealToAdd.sellerId = this.sellerId!;
    //const seller = this.sellers.find((x) => x.userId == dealToAdd.sellerId);
    //dealToAdd.sellerFullName = `${seller?.firstName} ${seller?.lastName}`;

    dealToAdd.selectedPackage = this.packageId
      ? this.packages.find((x) => x.packageId === this.packageId) || null
      : null;
    dealToAdd.name = `${dealToAdd.selectedPackage?.name} - ${this.profileName}`;
    dealToAdd.profileName = this.profileName;
    dealToAdd.clientEmail = this.clientEmail;

    this.http
      .addDeal(dealToAdd)
      .then(() => {
        this._bottomSheetRef.dismiss();
        this.isLoading = false;
        window.location.reload();
      })
      .catch((error) => {
        this.isLoading = false;
        if (error.message == 'AutomaticEmailErrorNewDeal') {
          const snackBarRef = this.snackBar.open(
            'Umowa została pomyslnie dodana, ale nie udało się wysłać e-mail onboarding do klienta. Sprawdź jego e-mail i ponów wysyłkę. NIE DODAWAJ PONOWNIE TEJ UMOWY!',
            'Odśwież stronę teraz',
            {
              duration: 900000,
              panelClass: ['warning-snackbar'],
            }
          );
          this._bottomSheetRef.dismiss();
          snackBarRef.afterDismissed().subscribe(() => {
            window.location.reload();
          });
        } else {
          this.errorMessage = error.message;
        }
      });
  }

  close() {
    this._bottomSheetRef.dismiss();
    window.location.reload();
  }
}
