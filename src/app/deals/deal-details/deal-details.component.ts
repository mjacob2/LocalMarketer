import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Params } from '@angular/router';
import { Deal } from 'src/app/models/deal.model';
import { ToDoGeneral } from 'src/app/models/todoGeneral.model';
import { DealsService } from 'src/app/services/deals.service';

@Component({
  selector: 'app-deal-details',
  templateUrl: './deal-details.component.html',
  styleUrls: ['./deal-details.component.scss'],
  providers: [DatePipe],
})
export class DealDetailsComponent {
  errorMessage: string = '';
  isLoading = false;
  deal: Deal = new Deal();
  dealId!: number;
  toDos: ToDoGeneral[] = [];
  selectedDate?: Date;

  constructor(
    private service: DealsService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private datePipe: DatePipe
  ) {}

  async ngOnInit() {
    this.isLoading = true;

    this.route.params.subscribe(async (params: Params) => {
      this.dealId = params['id'];
      this.deal = await this.service.getDealById(this.dealId);
      //this.deal.endDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
      console.log(this.deal.endDate);
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
          duration: 2000,
          panelClass: ['success-snackbar'],
        });
      })
      .catch((error) => {
        this.isLoading = false;
        this.errorMessage = error.message;
      });
  }

  openConfirmdDleteDialog() {}
}
