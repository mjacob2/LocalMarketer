import { Component, Inject, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { ProfilesService } from 'src/app/services/profiles.service';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { AddProfileRequestModel } from 'src/app/models/add-profile-request.model';

@Component({
  selector: 'app-add-profile',
  templateUrl: './add-profile.component.html',
  styleUrls: ['./add-profile.component.scss'],
})
export class AddProfileComponent {
  errorMessage: string = '';
  isLoading = false;

  constructor(
    private _bottomSheetRef: MatBottomSheetRef<AddProfileComponent>,
    private http: ProfilesService,
    @Inject(MAT_BOTTOM_SHEET_DATA) public clientId: number
  ) {}

  onSubmit(form: NgForm) {
    this.isLoading = true;

    let profile = new AddProfileRequestModel(
      this.clientId,
      form.value.name,
      form.value.googleProfileId,
      form.value.description
    );

    this.http
      .addProfile(profile)
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
