import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { XProfile } from 'src/app/models/XProfile.model';
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

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private router: Router,
    private profilesService: ProfilesService
  ) {}

  async ngOnInit() {
    this.profiles = await this.profilesService.getAllProfiles();
    this.dataSource.data = this.profiles;
    this.dataSource.sort = this.sort;
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
}
