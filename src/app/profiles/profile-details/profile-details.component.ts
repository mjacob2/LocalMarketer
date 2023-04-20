import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DealGeneral } from 'src/app/models/dealGeneral.mode';
import { Profile } from 'src/app/models/profile.model';
import { ToDoGeneral } from 'src/app/models/todoGeneral.model';
import { ProfilesService } from 'src/app/services/profiles.service';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.scss'],
})
export class ProfileDetailsComponent {
  errorMessage: string = '';
  isLoading = false;
  profile: Profile = new Profile();
  //todos?: ToDoGeneral[] = [];
  //deals?: DealGeneral[] = [];
  id!: number;

  constructor(
    private service: ProfilesService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  async ngOnInit() {
    this.isLoading = true;

    this.route.params.subscribe(async (params: Params) => {
      this.id = params['id'];
      this.profile = await this.service.getProfileById(this.id);
      console.log(this.profile);
      this.isLoading = false;
    });
  }

  saveChanges() {
    this.isLoading = true;

    this.service
      .updateProfileById(this.profile)
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
