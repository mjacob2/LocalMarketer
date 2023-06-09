import { Component } from '@angular/core';
import { MyFormsService } from 'src/app/services/myForms.service';
import { AddFormFaqRequestModel } from 'src/app/models/add-form-faq-request.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-faq-form',
  templateUrl: './faq-form.component.html',
  styleUrls: ['./faq-form.component.scss'],
})
export class FaqFormComponent {
  constructor(
    private http: MyFormsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  errorMessage: string = '';
  isLoading = false;
  name: string = '';
  form = new AddFormFaqRequestModel();

  numbers: number[] = [1];
  increment: number = 1;

  onSubmit(form: AddFormFaqRequestModel) {
    console.log(form);
    this.isLoading = true;

    const profileId = this.route.snapshot.queryParamMap.get('ProfileId');
    const dealId = this.route.snapshot.queryParamMap.get('DealId');

    form.ProfileId = parseInt(profileId!, 10);
    form.DealId = parseInt(dealId!, 10);

    this.http
      .addformFaq(form)
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
