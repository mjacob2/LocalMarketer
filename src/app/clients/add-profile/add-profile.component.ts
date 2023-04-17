import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { ProfilesService } from 'src/app/services/profiles.service';
import { ProfileGeneral } from '../../models/profileGeneral.model';

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
    private http: ProfilesService
  ) {}
  onSubmit(form: NgForm) {
    this.isLoading = true;

    const name = form.value.name;
    const description = form.value.description;

    const profile = new ProfileGeneral(2, name, description);

    this.http
      .addProfile(profile)
      .then(() => {
        this._bottomSheetRef.dismiss();
        //this.router.navigateByUrl('/clients');
        this.isLoading = false;
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
