import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import {
  Product,
  ProductResponse,
} from 'src/app/models/add-form-product-request.model';
import { FormProduct } from 'src/app/models/add-form-product-request.model';
import { MyFormsService } from 'src/app/services/myForms.service';

@Component({
  selector: 'app-product-form-view',
  templateUrl: './product-form-view.component.html',
  styleUrls: ['./product-form-view.component.scss'],
})
export class ProductFormViewComponent {
  constructor(private http: MyFormsService, private route: ActivatedRoute) {}
  errorMessage: string = '';
  isLoading = false;
  formProductResponse = new FormProduct();
  id!: number;
  products: ProductResponse[] = [];

  async ngOnInit() {
    this.isLoading = true;

    this.route.params.subscribe(async (params: Params) => {
      this.id = params['id'];
      this.formProductResponse = await this.http.getFormProductById(this.id);
      console.log(this.formProductResponse);

      if (this.formProductResponse && this.formProductResponse.products) {
        this.products = this.formProductResponse.products;
      }

      this.isLoading = false;
    });
  }
}
