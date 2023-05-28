import { Component, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { XProfile } from 'src/app/models/XProfile.model';
import { HttpService } from 'src/app/services/http.service';
import { ProfilesService } from 'src/app/services/profiles.service';

@Component({
  selector: 'app-profiles-table',
  templateUrl: './profiles-table.component.html',
  styleUrls: ['./profiles-table.component.scss'],
})
export class ProfilesTableComponent {
  displayedColumns = [
    'name',
    'clientId',
    'googleProfileId',
    'voivodeship',
    'city',
    'sellerFullName',
    'localMarketerFullName',
  ];
  dataSource = new MatTableDataSource<XProfile>();
  profiles?: XProfile[];

  count?: number;
  totalPages?: number;
  pageIndex?: number = 0;
  pageSize?: number = 20;

  queryParameter: string = '';
  queryParameterPageSize: string = `&PageSize=${this.pageSize}`;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private router: Router,
    private profilesService: ProfilesService,
    private http: HttpService
  ) {}

  async ngOnInit() {
    this.queryParameter = '?';
    await this.reloadData(
      `${this.queryParameter}${this.queryParameterPageSize}`
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openProfileDetailsPage(id: string) {
    this.router.navigateByUrl(`/profiles/${id}`);
  }

  async handlePageEvent(e: PageEvent) {
    this.pageIndex = e.pageIndex;
    this.pageSize = e.pageSize;

    const queryParameterPageIndex: string = `&PageIndex=${this.pageIndex}`;
    this.queryParameterPageSize = `&PageSize=${this.pageSize}`;
    await this.reloadData(
      `${this.queryParameter}${queryParameterPageIndex}${this.queryParameterPageSize}`
    );
  }

  private async reloadData(queryParameters: string) {
    this.profiles = undefined;
    this.profiles = await this.profilesService.getAllProfiles(
      `${queryParameters}${this.queryParameterPageSize}`
    );
    this.count = this.http.count;
    this.dataSource.data = this.profiles;
  }
}
