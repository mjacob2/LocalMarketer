import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormProduct,
  Product,
} from 'src/app/models/add-form-product-request.model';
import { MyFormsService } from 'src/app/services/myForms.service';

@Component({
  selector: 'app-products-form',
  templateUrl: './products-form.component.html',
  styleUrls: ['./products-form.component.scss'],
})
export class ProductsFormComponent {
  constructor(
    private http: MyFormsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  errorMessage: string = '';
  isLoading = false;
  numbers: number[] = [1];
  increment: number = 1;
  products: Product[] = [];
  addFormProductRequest: FormProduct = new FormProduct();

  onSubmit(form: any) {
    this.isLoading = true;

    this.addFormProductRequest.products = [];
    for (let number of this.numbers) {
      const service: Product = new Product(
        form['category' + number],
        form['name' + number],
        form['price' + number],
        form['description' + number],
        form['link' + number]
      );
      this.addFormProductRequest.products.push(service);
    }

    const profileId = this.route.snapshot.queryParamMap.get('ProfileId');
    const dealId = this.route.snapshot.queryParamMap.get('DealId');
    this.addFormProductRequest.profileId = parseInt(profileId!, 10);
    this.addFormProductRequest.dealId = parseInt(dealId!, 10);

    console.log(this.addFormProductRequest);

    this.http
      .addFormProduct(this.addFormProductRequest)
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
