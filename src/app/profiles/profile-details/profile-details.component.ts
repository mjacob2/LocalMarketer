import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ProfilesService } from 'src/app/services/profiles.service';
import { ConfirmDeleteDialogComponent } from 'src/app/shared/confirm-delete-dialog/confirm-delete-dialog.component';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UsersService } from 'src/app/services/users.service';
import { XProfile } from 'src/app/models/XProfile.model';
import { XUser } from 'src/app/models/XUser.model';
import { XToDo } from 'src/app/models/XToDo.model';
import { CustomerService } from 'src/app/models/customer-service.model';
import { Constants } from 'src/app/constants/customerServices';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.scss'],
})
export class ProfileDetailsComponent {
  errorMessage: string = '';
  isLoading = false;
  profile: XProfile = new XProfile();
  profileId!: number;
  profileName?: string;
  clientEmail?: string;
  allToDos: XToDo[] = [];
  loggedUser: XUser | null = {};
  isSeller: boolean = false;
  customerService?: string;
  customerServices?: CustomerService[];

  constructor(
    private service: ProfilesService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router,
    private localStorage: LocalStorageService,
    private httpUsers: UsersService
  ) {
    this.customerServices = Constants.customerServices;
  }

  async ngOnInit() {
    this.isLoading = true;

    this.loggedUser = await this.localStorage.getItem<XUser>('user');
    if (this.loggedUser?.role == 'Seller') {
      this.isSeller = true;
    }

    this.route.params.subscribe(async (params: Params) => {
      this.profileId = params['id'];

      this.profile = await this.service.getProfileById(this.profileId);

      this.customerService = this.profile.customerService;
      this.profileName = this.profile.name;
      this.clientEmail = this.profile.clientEmail;

      let deals = this.profile.deals;
      if (deals != undefined) {
        deals.forEach((deal) => {
          deal.toDos?.forEach((todo) => {
            this.allToDos.push(todo);
            console.log('todo ' + todo);
          });
        });
      }

      this.isLoading = false;
    });
  }

  saveChanges() {
    this.isLoading = true;

    this.profile.customerService = this.customerService;
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
    this.service
      .deleteProfileById(this.profileId)
      .then(() => {
        this.errorMessage = '';
        this.isLoading = false;
        this.snackBar.open('Profil został usunięty', 'Ok', {
          duration: 3000,
          panelClass: ['success-snackbar'],
        });
        this.router.navigateByUrl('/profiles');
      })
      .catch((error) => {
        this.isLoading = false;
        this.errorMessage = error.message;
      });
  }

  openConfirmdDleteDialog() {
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent);
    dialogRef.componentInstance.onDelete.subscribe(() => {
      this.deleteProfile();
    });
  }
}
