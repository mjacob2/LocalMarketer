import { Component, Input, OnInit } from '@angular/core';
import {
  MatBottomSheet,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { Client } from 'src/app/models/client.model';
import { ProfileGeneral } from 'src/app/models/profileGeneral.model';
import { AddProfileComponent } from '../../add-profile/add-profile.component';

@Component({
  selector: 'app-client-details-profiles',
  templateUrl: './client-details-profiles.component.html',
  styleUrls: ['./client-details-profiles.component.scss'],
})
export class ClientDetailsProfilesComponent {
  constructor(private bottomSheet: MatBottomSheet) {}
  @Input()
  profiles?: ProfileGeneral[] = [];

  ngOnInit() {
    console.log(this.profiles);
  }

  openAddProfileBottomSheet() {
    const bottomSheetRef: MatBottomSheetRef = this.bottomSheet.open(
      AddProfileComponent,
      {
        disableClose: true,
      }
    );
  }
}
