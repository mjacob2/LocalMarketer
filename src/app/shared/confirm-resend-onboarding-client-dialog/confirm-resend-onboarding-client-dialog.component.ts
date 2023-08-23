import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ResendOnboardingRequest } from 'src/app/models/requests/resend-onboarding-to-client.request';
import { DealsService } from 'src/app/services/deals.service';

@Component({
  selector: 'app-confirm-resend-onboarding-client-dialog',
  templateUrl: './confirm-resend-onboarding-client-dialog.component.html',
  styleUrls: ['./confirm-resend-onboarding-client-dialog.component.scss'],
})
export class ConfirmResendOnboardingClientDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ConfirmResendOnboardingClientDialogComponent>,
    private service: DealsService,
    private snackBar: MatSnackBar
  ) {
    this.profileId = data.profileId;
    this.dealId = data.dealId;
    this.clientEmail = data.clientEmail;
  }

  errorMessage: string = '';
  isLoading = false;

  profileId?: number;
  dealId?: number;
  clientEmail?: string;

  ngOnInit() {
    console.log(this.profileId);
    console.log(this.dealId);
    console.log(this.clientEmail);
  }

  async resendOnboardingClient() {
    this.isLoading = true;
    const request = new ResendOnboardingRequest(
      this.profileId,
      this.dealId,
      this.clientEmail
    );
    console.log(request);

    await this.service
      .resendOnboarding(request)
      .then(() => {
        this.errorMessage = '';
        this.isLoading = false;
        this.snackBar.open('Onboarding wysłany pomyślnie', 'Ok', {
          duration: 3000,
          panelClass: ['success-snackbar'],
        });
        this.dialogRef.close();
      })
      .catch((error) => {
        this.isLoading = false;
        this.errorMessage = error.message;
      });
  }
}
