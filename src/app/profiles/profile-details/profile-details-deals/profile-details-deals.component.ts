import { Component, Input } from '@angular/core';
import {
  MatBottomSheet,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';
import { AddDealComponent } from '../../add-deal/add-deal.component';
import { XDeal } from 'src/app/models/XDeal.model';

@Component({
  selector: 'app-profile-details-deals',
  templateUrl: './profile-details-deals.component.html',
  styleUrls: ['./profile-details-deals.component.scss'],
})
export class ProfileDetailsDealsComponent {
  constructor(private bottomSheet: MatBottomSheet, private router: Router) {}

  @Input()
  deals?: XDeal[] = [];

  @Input()
  profileId?: number;

  @Input()
  profileName?: string;

  @Input()
  clientEmail?: string;

  openAddDealBottomSheet() {
    const bottomSheetRef: MatBottomSheetRef = this.bottomSheet.open(
      AddDealComponent,
      {
        disableClose: true,
        data: {
          profileId: this.profileId,
          profileName: this.profileName,
          clientEmail: this.clientEmail,
        },
      }
    );
  }

  goToDeal(id?: number) {
    console.log(id);
    this.router.navigateByUrl(`/deals/${id}`);
  }
}
