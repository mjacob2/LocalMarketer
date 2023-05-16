import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DealsList } from 'src/app/models/dealsList.model';
import { DealsService } from 'src/app/services/deals.service';

@Component({
  selector: 'app-deals-table',
  templateUrl: './deals-table.component.html',
  styleUrls: ['./deals-table.component.scss'],
})
export class DealsTableComponent {
  displayedColumns = ['name', 'creationDate', 'endDate', 'stage', 'creatorId'];
  dataSource!: MatTableDataSource<DealsList>;
  deals?: DealsList[];

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private router: Router, private dealsService: DealsService) {}

  async ngOnInit() {
    this.deals = await this.dealsService.getAllDeals();
    this.dataSource = new MatTableDataSource(this.deals);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDealDetailsPage(id: string) {
    this.router.navigateByUrl(`/deals/${id}`);
  }
}
