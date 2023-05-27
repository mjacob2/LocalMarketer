import { Component, Input } from '@angular/core';
import {
  MatBottomSheet,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { AddProfileComponent } from '../../add-profile/add-profile.component';
import { Router } from '@angular/router';
import { XProfile } from 'src/app/models/XProfile.model';

@Component({
  selector: 'app-client-details-profiles',
  templateUrl: './client-details-profiles.component.html',
  styleUrls: ['./client-details-profiles.component.scss'],
})
export class ClientDetailsProfilesComponent {
  constructor(private bottomSheet: MatBottomSheet, private router: Router) {}

  @Input()
  profiles?: XProfile[] = [];

  @Input()
  clientId?: number;

  openAddProfileBottomSheet() {
    const bottomSheetRef: MatBottomSheetRef = this.bottomSheet.open(
      AddProfileComponent,
      {
        disableClose: true,
        data: this.clientId,
      }
    );
  }

  goToProfile(id?: number) {
    console.log(id);
    this.router.navigateByUrl(`/profiles/${id}`);
  }
}
