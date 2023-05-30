import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Constants } from 'src/app/constants/customerServices';
import { XProfile } from 'src/app/models/XProfile.model';
import { AddFormBasicRequestModel } from 'src/app/models/add-form-basic-request.model';
import { CustomerService } from 'src/app/models/customer-service.model';
import { MyFormsService } from 'src/app/services/myForms.service';
import { ProfilesService } from 'src/app/services/profiles.service';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-basic-form',
  templateUrl: './basic-form.component.html',
  styleUrls: ['./basic-form.component.scss'],
})
export class BasicFormComponent {
  constructor(
    private route: ActivatedRoute,
    private profilesService: ProfilesService,
    private myFormsServiceHttp: MyFormsService,
    private router: Router
  ) {
    this.customerServices = Constants.customerServices;
  }
  errorMessage: string = '';
  isLoadingInitial = false;
  isLoading = false;
  customerServices?: CustomerService[];
  profileId!: number;
  profile?: XProfile;

  atr1 = false;
  atr2 = false;
  atr3 = false;
  atr4 = false;
  atr5 = false;
  atr6 = false;
  atr7 = false;
  atr8 = false;
  atr9 = false;
  atr10 = false;
  atr11 = false;
  atr12 = false;
  atr13 = false;
  atr14 = false;
  atr15 = false;
  atr16 = false;
  atr17 = false;

  async ngOnInit() {
    this.isLoadingInitial = true;

    this.route.queryParamMap.subscribe(async (params: Params) => {
      const profileId = this.route.snapshot.queryParamMap.get('ProfileId');
      this.profile = await this.profilesService.getProfileByIdAnonymous(
        parseInt(profileId!, 10)
      );
      console.log(this.profile);

      this.isLoadingInitial = false;
    });
  }

  onSubmit(form: AddFormBasicRequestModel) {
    this.isLoading = true;

    this.updateProfileWithDataFromForm(form);
  }

  private addBasicForm(form: AddFormBasicRequestModel) {
    const dealId = this.route.snapshot.queryParamMap.get('DealId');
    form.dealId = parseInt(dealId!, 10);
    form.profileId = this.profile!.profileId;

    console.log(form);

    this.myFormsServiceHttp
      .addFormBasic(form)
      .then(() => {
        this.router.navigateByUrl('/forms/thx');
        this.isLoading = false;
      })
      .catch((error) => {
        this.isLoading = false;
        this.errorMessage = error.message;
      });
  }

  private updateProfileWithDataFromForm(form: AddFormBasicRequestModel) {
    console.log(this.profile);

    this.profilesService
      .updateProfileById(this.profile!)
      .then(() => {
        this.errorMessage = '';
        this.addBasicForm(form);
      })
      .catch((error) => {
        this.isLoading = false;
        this.errorMessage = error.message;
      });
  }
}
