import { Component, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { XDeal } from 'src/app/models/XDeal.model';
import { DealsService } from 'src/app/services/deals.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-deals-table',
  templateUrl: './deals-table.component.html',
  styleUrls: ['./deals-table.component.scss'],
})
export class DealsTableComponent {
  displayedColumns = ['name', 'creationDate', 'endDate', 'stage', 'creatorId'];
  dataSource = new MatTableDataSource<XDeal>();
  deals?: XDeal[];

  count?: number;
  totalPages?: number;
  pageIndex?: number = 0;
  pageSize?: number = 20;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private router: Router,
    private dealsService: DealsService,
    private http: HttpService
  ) {}

  async ngOnInit() {
    await this.reloadData();
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

  async handlePageEvent(e: PageEvent) {
    this.pageIndex = e.pageIndex;
    this.pageSize = e.pageSize;
    await this.reloadData();
  }

  private async reloadData() {
    this.deals = undefined;
    this.deals = await this.dealsService.getAllDeals(
      `?PageIndex=${this.pageIndex}&PageSize=${this.pageSize}`
    );
    this.count = this.http.count;
    this.dataSource.data = this.deals;
  }
}
