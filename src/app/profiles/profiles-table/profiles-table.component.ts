import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ProfilesList } from 'src/app/models/profilesList.model';
import { ProfilesService } from 'src/app/services/profiles.service';

@Component({
  selector: 'app-profiles-table',
  templateUrl: './profiles-table.component.html',
  styleUrls: ['./profiles-table.component.scss'],
})
export class ProfilesTableComponent {
  displayedColumns = ['name', 'city', 'source', 'clientId', 'userId'];
  dataSource!: MatTableDataSource<ProfilesList>;
  profiles: ProfilesList[] = [];

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private router: Router,
    private profilesService: ProfilesService
  ) {}

  async ngOnInit() {
    this.profiles = await this.profilesService.getAllProfiles();
    this.dataSource = new MatTableDataSource(this.profiles);
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

  openProfileDetailsPage(id: string) {
    this.router.navigateByUrl(`/profiles/${id}`);
  }
}
