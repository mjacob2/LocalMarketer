import { Component } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { MyFormsService } from 'src/app/services/myForms.service';
import { AddAttachmentRequestModel } from 'src/app/models/add-attachment-request.model';

@Component({
  selector: 'app-faq-form',
  templateUrl: './faq-form.component.html',
  styleUrls: ['./faq-form.component.scss'],
})
export class FaqFormComponent {
  constructor(private http: MyFormsService) {}
  name: string = '';
  attachment = new AddAttachmentRequestModel();

  save(formData: any): void {
    this.attachment.data = Array.from(this.generatePdf(formData)).map(
      (byte) => byte
    );
    this.attachment.name = 'fileName';
    this.attachment.profileId = 24;

    this.http
      .addAttachment(this.attachment)
      .then(() => {
        //this.isLoading = false;
        // window.location.reload();
      })
      .catch((error) => {
        //this.isLoading = false;
        //this.errorMessage = error.message;
      });
  }

  generatePdf(formData: any): Uint8Array {
    const doc = new jsPDF();
    doc.text(`Name: ${formData.name}`, 10, 10);
    // Add more content to the document as needed
    const pdfData = doc.output('arraybuffer');

    return new Uint8Array(pdfData);
  }
}
