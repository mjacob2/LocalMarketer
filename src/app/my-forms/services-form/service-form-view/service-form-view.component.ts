import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import {
  FormService,
  Service,
} from 'src/app/models/add-form-service-request.model';
import { MyFormsService } from 'src/app/services/myForms.service';

@Component({
  selector: 'app-service-form-view',
  templateUrl: './service-form-view.component.html',
  styleUrls: ['./service-form-view.component.scss'],
})
export class ServiceFormViewComponent {
  constructor(private http: MyFormsService, private route: ActivatedRoute) {}
  errorMessage: string = '';
  isLoading = false;
  formServiceResponse = new FormService();
  id!: number;
  services: Service[] = [];

  async ngOnInit() {
    this.isLoading = true;

    this.route.params.subscribe(async (params: Params) => {
      this.id = params['id'];
      this.formServiceResponse = await this.http.getFormServiceById(this.id);
      console.log(this.formServiceResponse);

      if (this.formServiceResponse && this.formServiceResponse.services) {
        this.services = this.formServiceResponse.services;
      }

      this.isLoading = false;
    });
  }
}
