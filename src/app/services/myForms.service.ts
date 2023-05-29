import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { AddFormFaqRequestModel } from '../models/add-form-faq-request.model';
import { GetFormFaqByIdResponseModel } from '../models/get-form-faq-by-id-response.model';
import { FormService } from '../models/add-form-service-request.model';
import { FormProduct } from '../models/add-form-product-request.model';
import { AddFormBasicRequestModel } from '../models/add-form-basic-request.model';

@Injectable({
  providedIn: 'root',
})
export class MyFormsService {
  constructor(private http: HttpService) {}

  async addformFaq(form: AddFormFaqRequestModel) {
    return await this.http.post<AddFormFaqRequestModel>(`/forms/Faq`, form);
  }

  async getFormFaqById(id: number) {
    return await this.http.get<GetFormFaqByIdResponseModel>(`/forms/faq/${id}`);
  }

  async addformService(form: FormService) {
    return await this.http.post<FormService>(`/forms/service`, form);
  }

  async getFormServiceById(id: number) {
    return await this.http.get<FormService>(`/forms/service/${id}`);
  }

  async addFormProduct(form: FormProduct) {
    return await this.http.post<FormProduct>(`/forms/product`, form);
  }

  async getFormProductById(id: number) {
    return await this.http.get<FormProduct>(`/forms/product/${id}`);
  }

  async addFormBasic(form: AddFormBasicRequestModel) {
    return await this.http.post<AddFormBasicRequestModel>(`/forms/basic`, form);
  }
}
