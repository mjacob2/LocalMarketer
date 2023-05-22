import { Component } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import {
  FormProduct,
  Product,
} from 'src/app/models/add-form-product-request.model';
import { MyFormsService } from 'src/app/services/myForms.service';
import {
  DataUrl,
  NgxImageCompressService,
  UploadResponse,
} from 'ngx-image-compress';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-products-form',
  templateUrl: './products-form.component.html',
  styleUrls: ['./products-form.component.scss'],
})
export class ProductsFormComponent {
  constructor(
    private http: MyFormsService,
    private router: Router,
    private route: ActivatedRoute,
    private imageCompress: NgxImageCompressService
  ) {}

  errorMessage: string = '';
  fileUploadErrorMessage: string = '';
  isLoading = false;
  isImageLoading = false;
  numbers: number[] = [1];
  increment: number = 1;
  products: Product[] = [];
  addFormProductRequest: FormProduct = new FormProduct();
  imgResultAfterResize: DataUrl = '';
  apendedImages: DataUrl[] = [];

  onSubmit(form: any) {
    this.isLoading = true;

    this.addFormProductRequest.products = [];
    for (let number of this.numbers) {
      const product: Product = new Product(
        form['category' + number],
        form['name' + number],
        form['price' + number],
        form['description' + number],
        form['link' + number],
        (form['image' + number] = this.apendedImages[number - 1]
          ? this.apendedImages[number - 1]
          : '')
      );

      this.addFormProductRequest.products.push(product);
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
        this.moveToBottom();
      });
  }

  uploadAndResize(number: number) {
    return this.imageCompress
      .uploadFile()
      .then(({ image, orientation }: UploadResponse) => {
        this.isImageLoading = true;
        this.imageCompress
          .compressFile(image, orientation, 100, 70, 700, 0)
          .then((result: DataUrl) => {
            this.isImageLoading = false;
            this.imgResultAfterResize = result;
            this.apendedImages[number - 1] = result;
          })
          .catch((error) => {
            this.imgResultAfterResize = '';
            this.isImageLoading = false;
            this.fileUploadErrorMessage =
              'Plik nie jest zdjęciem lub plik uszkodzony. Załaduj inne zdjęcie.';
          });
      });
  }

  add() {
    this.increment++;
    this.numbers.push(this.increment);
    console.log(this.numbers);
    this.moveToBottom();
  }

  private moveToBottom() {
    setTimeout(() => {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth',
      });
    }, 200);
  }

  remove() {
    this.increment--;
    this.numbers.pop();
    if (this.increment < this.apendedImages.length) {
      this.apendedImages.pop();
    }
  }
}
