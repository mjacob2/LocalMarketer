import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { AddFormFaqRequestModel } from '../models/add-form-faq-request.model';
import { GetFormFaqByIdResponseModel } from '../models/get-form-faq-by-id-response.model';

@Injectable({
  providedIn: 'root',
})
export class MyFormsService {
  constructor(private http: HttpService) {}

  async addformFaq(form: AddFormFaqRequestModel) {
    return await this.http.post<AddFormFaqRequestModel>(`/formFaq`, form);
  }

  async getFormFaqById(id: number) {
    return await this.http.get<GetFormFaqByIdResponseModel>(`/formfaq/${id}`);
  }
}
