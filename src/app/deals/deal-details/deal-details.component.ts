import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { XDeal } from 'src/app/models/XDeal.model';
import { XUser } from 'src/app/models/XUser.model';
import { DealsService } from 'src/app/services/deals.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { ConfirmDeleteDialogComponent } from 'src/app/shared/confirm-delete-dialog/confirm-delete-dialog.component';

@Component({
  selector: 'app-deal-details',
  templateUrl: './deal-details.component.html',
  styleUrls: ['./deal-details.component.scss'],
})
export class DealDetailsComponent {
  errorMessage: string = '';
  isLoading = false;
  deal: XDeal = new XDeal();
  dealId!: number;
  loggedUser: XUser | null = {};
  isSeller: boolean = false;

  constructor(
    private service: DealsService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private localStorage: LocalStorageService
  ) {}

  async ngOnInit() {
    this.loggedUser = await this.localStorage.getItem<XUser>('user');
    if (this.loggedUser?.role == 'Seller') {
      this.isSeller = true;
    }

    this.isLoading = true;

    this.route.params.subscribe(async (params: Params) => {
      this.dealId = params['id'];
      this.deal = await this.service.getDealById(this.dealId);
      console.log(this.deal);
      this.isLoading = false;
    });
  }

  saveChanges() {
    this.isLoading = true;
    this.service
      .updateDealById(this.deal)
      .then(() => {
        this.errorMessage = '';
        this.isLoading = false;
        this.snackBar.open('Zmiany zostały zapisane', 'Ok', {
          duration: 3000,
          panelClass: ['success-snackbar'],
        });
      })
      .catch((error) => {
        this.isLoading = false;
        this.errorMessage = error.message;
      });
  }

  deleteDeal() {
    this.service
      .deleteDealById(this.dealId)
      .then(() => {
        this.errorMessage = '';
        this.isLoading = false;
        this.snackBar.open('Umowa została usunięta', 'Ok', {
          duration: 3000,
          panelClass: ['success-snackbar'],
        });
        this.router.navigateByUrl('/deals');
      })
      .catch((error) => {
        this.isLoading = false;
        this.errorMessage = error.message;
      });
  }

  openConfirmdDleteDialog() {
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent);
    dialogRef.componentInstance.onDelete.subscribe(() => {
      this.deleteDeal();
    });
  }
}
