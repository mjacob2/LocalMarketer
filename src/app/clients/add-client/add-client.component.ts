import { Component } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';
import { Client } from 'src/app/models/client.model';
import { HttpService } from 'src/app/services/http.service';
import { FormControl, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss'],
})
export class AddClientComponent {
  constructor(
    private _bottomSheetRef: MatBottomSheetRef<AddClientComponent>,
    private http: HttpService,
    private router: Router
  ) {}
  errorMessage: string = '';
  isLoading = false;

  onSubmit(form: NgForm) {
    this.isLoading = true;

    const firstName = form.value.firstName;
    const lastName = form.value.lastName;
    const phone = form.value.phone;
    const email = form.value.email;
    const source = form.value.source;
    const description = form.value.description;

    const clientToAdd = new Client(
      firstName,
      lastName,
      phone,
      email,
      source,
      description
    );

    this.http
      .post('/clients', clientToAdd)
      .then(() => {
        this._bottomSheetRef.dismiss();
        this.router.navigateByUrl('/clients');
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
