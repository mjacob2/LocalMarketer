import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DealGeneral } from 'src/app/models/dealGeneral.mode';
import { Profile } from 'src/app/models/profile.model';
import { ProfilesService } from 'src/app/services/profiles.service';
import { ToDoGeneral } from '../../models/todoGeneral.model';
import { ConfirmDeleteDialogComponent } from 'src/app/shared/confirm-delete-dialog/confirm-delete-dialog.component';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.scss'],
})
export class ProfileDetailsComponent {
  errorMessage: string = '';
  isLoading = false;
  profile: Profile = new Profile();
  profileId!: number;
  allToDos: ToDoGeneral[] = [];

  constructor(
    private service: ProfilesService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  async ngOnInit() {
    this.isLoading = true;

    this.route.params.subscribe(async (params: Params) => {
      this.profileId = params['id'];

      this.profile = await this.service.getProfileById(this.profileId);

      console.log(this.profile.deals);

      let deals = this.profile.deals;
      if (deals != undefined) {
        deals.forEach((deal) => {
          console.log('deal ' + deal);
          //if (deal.todos != undefined) {
          deal.toDos.forEach((todo) => {
            this.allToDos.push(todo);
            console.log('todo ' + todo);
          });
          //}
        });
      }

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

  deleteProfile() {
    this.service.deleteProfileById(this.profileId);
    this.router.navigateByUrl('/profiles');
  }

  openConfirmdDleteDialog() {
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent);
    dialogRef.componentInstance.onDelete.subscribe(() => {
      this.deleteProfile();
    });
  }
}