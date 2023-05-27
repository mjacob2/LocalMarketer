import { Component, Inject, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { ProfilesService } from 'src/app/services/profiles.service';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { CustomerService } from 'src/app/models/customer-service.model';
import { XProfile } from 'src/app/models/XProfile.model';

@Component({
  selector: 'app-add-profile',
  templateUrl: './add-profile.component.html',
  styleUrls: ['./add-profile.component.scss'],
})
export class AddProfileComponent {
  errorMessage: string = '';
  isLoading = false;
  customerService?: string;
  customerServices: CustomerService[] = [
    { value: 'insideOnly', viewValue: 'Tylko na miejscu' },
    { value: 'awayOnly', viewValue: 'Tylko z dojazdem' },
    { value: 'insideAndAway', viewValue: 'Na miejscu i z dojazdem' },
  ];

  constructor(
    private _bottomSheetRef: MatBottomSheetRef<AddProfileComponent>,
    private http: ProfilesService,
    @Inject(MAT_BOTTOM_SHEET_DATA) public clientId: number
  ) {}

  onSubmit(addProfileRequest: XProfile) {
    this.isLoading = true;

    addProfileRequest.clientId = this.clientId;

    this.http
      .addProfile(addProfileRequest)
      .then(() => {
        this.isLoading = false;
        this._bottomSheetRef.dismiss();
        window.location.reload();
      })
      .catch((error) => {
        this.isLoading = false;
        this.errorMessage = error.message;
      });
  }

  closeBottomSheet() {
    this._bottomSheetRef.dismiss();
  }
}
