import { Component, Inject } from '@angular/core';
import {
  MAT_BOTTOM_SHEET_DATA,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';
import { XUser } from 'src/app/models/XUser.model';
import { AddUserRequest } from 'src/app/models/requests/add-user.request';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent {
  constructor(
    private _bottomSheetRef: MatBottomSheetRef<AddUserComponent>,
    private http: UsersService,
    private router: Router
  ) {}

  errorMessage: string = '';
  selectedRole?: string;
  isLoading = false;
  roles = [
    { value: 'Manager', viewValue: 'Manager' },
    { value: 'LocalMarketer', viewValue: 'Local Marketer' },
    { value: 'Seller', viewValue: 'Sprzedawca' },
  ];

  onSubmit(userToAdd: XUser) {
    userToAdd.role = this.selectedRole;

    this.isLoading = true;

    this.http
      .AddUser(userToAdd)
      .then(() => {
        this._bottomSheetRef.dismiss();
        this.router.navigateByUrl('/users');
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
