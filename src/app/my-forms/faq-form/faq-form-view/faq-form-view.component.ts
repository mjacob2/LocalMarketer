import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { GetFormFaqByIdResponseModel } from 'src/app/models/get-form-faq-by-id-response.model';
import { MyFormsService } from 'src/app/services/myForms.service';

@Component({
  selector: 'app-faq-form-view',
  templateUrl: './faq-form-view.component.html',
  styleUrls: ['./faq-form-view.component.scss'],
})
export class FaqFormViewComponent {
  constructor(private http: MyFormsService, private route: ActivatedRoute) {}
  errorMessage: string = '';
  isLoading = false;
  formFaqResponse = new GetFormFaqByIdResponseModel();
  id!: number;

  async ngOnInit() {
    this.isLoading = true;

    this.route.params.subscribe(async (params: Params) => {
      this.id = params['id'];
      this.formFaqResponse = await this.http.getFormFaqById(this.id);
      console.log(this.formFaqResponse);

      this.isLoading = false;
    });
  }
}
