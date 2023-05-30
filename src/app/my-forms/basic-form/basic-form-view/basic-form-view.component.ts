import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AddFormBasicRequestModel } from 'src/app/models/add-form-basic-request.model';
import { MyFormsService } from 'src/app/services/myForms.service';

@Component({
  selector: 'app-basic-form-view',
  templateUrl: './basic-form-view.component.html',
  styleUrls: ['./basic-form-view.component.scss'],
})
export class BasicFormViewComponent {
  constructor(private http: MyFormsService, private route: ActivatedRoute) {}
  errorMessage: string = '';
  isLoading = false;
  formBasic = new AddFormBasicRequestModel();
  id!: number;
  websiteUrlWithUTM: string = '';

  async ngOnInit() {
    this.isLoading = true;

    this.route.params.subscribe(async (params: Params) => {
      this.id = params['id'];
      this.formBasic = await this.http.getFormBasicById(this.id);
      console.log(this.formBasic);
      if (this.formBasic.websiteUrl) {
        this.websiteUrlWithUTM = `${this.formBasic.websiteUrl}?utm_source=ProfilFirmyGoogle&utm_medium=LocalMarketing&utm_campaign=LocalMarketing`;
      }

      this.isLoading = false;
    });
  }
}
