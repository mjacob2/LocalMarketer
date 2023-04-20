import { Component } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';
import { Client } from 'src/app/models/client.model';
import { ClientsService } from 'src/app/services/clients.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss'],
})
export class AddClientComponent {
  constructor(
    private _bottomSheetRef: MatBottomSheetRef<AddClientComponent>,
    private http: ClientsService,
    private router: Router
  ) {}
  errorMessage: string = '';
  isLoading = false;

  onSubmit(clientToAdd: Client) {
    console.log(clientToAdd);
    this.isLoading = true;

    this.http
      .addClient(clientToAdd)
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
