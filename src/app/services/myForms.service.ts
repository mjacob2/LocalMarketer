import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { AddAttachmentRequestModel } from '../models/add-attachment-request.model';

@Injectable({
  providedIn: 'root',
})
export class MyFormsService {
  constructor(private http: HttpService) {}

  async addAttachment(attachment: AddAttachmentRequestModel) {
    return await this.http.post<AddAttachmentRequestModel>(
      `/attachments`,
      attachment
    );
  }
}
