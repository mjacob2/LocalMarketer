import { Component, Inject } from '@angular/core';
import {
  MAT_BOTTOM_SHEET_DATA,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { AddDealRequestModel } from 'src/app/models/add-deal-request.model';
import { Package } from 'src/app/models/package.model';
import { DealsService } from 'src/app/services/deals.service';
import { PackagesService } from 'src/app/services/packages.service';

@Component({
  selector: 'app-add-deal',
  templateUrl: './add-deal.component.html',
  styleUrls: ['./add-deal.component.scss'],
})
export class AddDealComponent {
  errorMessage: string = '';
  isLoading = false;
  deal = new AddDealRequestModel();
  packages: Package[] = [];
  newDate: Date = new Date();

  constructor(
    private _bottomSheetRef: MatBottomSheetRef<AddDealComponent>,
    private http: DealsService,
    private httpPackages: PackagesService,
    @Inject(MAT_BOTTOM_SHEET_DATA) public profileId: number
  ) {}

  async ngOnInit() {
    this.packages = await this.httpPackages.getAllPackages();
  }

  addDeal() {
    this.isLoading = true;

    this.deal.profileId = this.profileId;

    const selectedPackage = this.packages.find(
      (x) => x.id === this.deal.packageId
    );
    const duration = selectedPackage?.durationInMonths;
    const name = selectedPackage?.name;

    this.newDate.setMonth(this.newDate.getMonth() + duration!);
    this.deal.endDate = this.newDate;
    this.deal.name = name;

    this.http
      .addDeal(this.deal)
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
