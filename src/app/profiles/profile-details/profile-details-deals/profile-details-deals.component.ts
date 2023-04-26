import { Component, Input } from '@angular/core';
import {
  MatBottomSheet,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';
import { DealGeneral } from 'src/app/models/dealGeneral.mode';
import { ToDoGeneral } from 'src/app/models/todoGeneral.model';
import { AddDealComponent } from '../../add-deal/add-deal.component';

@Component({
  selector: 'app-profile-details-deals',
  templateUrl: './profile-details-deals.component.html',
  styleUrls: ['./profile-details-deals.component.scss'],
})
export class ProfileDetailsDealsComponent {
  constructor(private bottomSheet: MatBottomSheet, private router: Router) {}

  @Input()
  deals?: DealGeneral[] = [];

  @Input()
  profileId?: number;

  openAddDealBottomSheet() {
    const bottomSheetRef: MatBottomSheetRef = this.bottomSheet.open(
      AddDealComponent,
      {
        disableClose: true,
        data: this.profileId,
      }
    );
  }

  goToDeal(id: number) {
    console.log(id);
    this.router.navigateByUrl(`/deals/${id}`);
  }
}
