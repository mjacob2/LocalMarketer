import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormService,
  Service,
} from 'src/app/models/add-form-service-request.model';
import { MyFormsService } from 'src/app/services/myForms.service';

@Component({
  selector: 'app-services-form',
  templateUrl: './services-form.component.html',
  styleUrls: ['./services-form.component.scss'],
})
export class ServicesFormComponent {
  constructor(
    private http: MyFormsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  errorMessage: string = '';
  isLoading = false;
  numbers: number[] = [1];
  increment: number = 1;
  services: Service[] = [];
  addFormServiceRequest: FormService = new FormService();

  onSubmit(form: any) {
    this.isLoading = true;

    this.addFormServiceRequest.services = [];
    for (let number of this.numbers) {
      const service: Service = new Service(
        form['category' + number],
        form['name' + number],
        form['price' + number],
        form['description' + number]
      );
      this.addFormServiceRequest.services.push(service);
    }

    const profileId = this.route.snapshot.queryParamMap.get('ProfileId');
    const dealId = this.route.snapshot.queryParamMap.get('DealId');
    this.addFormServiceRequest.profileId = parseInt(profileId!, 10);
    this.addFormServiceRequest.dealId = parseInt(dealId!, 10);

    console.log(this.addFormServiceRequest);

    this.http
      .addformService(this.addFormServiceRequest)
      .then(() => {
        this.router.navigateByUrl('/forms/thx');
        this.isLoading = false;
      })
      .catch((error) => {
        this.isLoading = false;
        this.errorMessage = error.message;
      });
  }
  add() {
    this.increment++;
    this.numbers.push(this.increment);
    console.log(this.numbers);
    setTimeout(() => {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth',
      });
    }, 200); // Delay of 500 milliseconds (adjust as needed)
  }
}
