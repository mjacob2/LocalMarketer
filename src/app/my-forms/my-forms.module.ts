import { FaqFormComponent } from './faq-form/faq-form.component';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { ErrorCardComponent } from '../shared/error-card/error-card.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FormThxComponent } from './form-thx/form-thx.component';
import { FaqFormViewComponent } from './faq-form/faq-form-view/faq-form-view.component';
import { MatIconModule } from '@angular/material/icon';
import { ServicesFormComponent } from './services-form/services-form.component';
import { ServiceFormViewComponent } from './services-form/service-form-view/service-form-view.component';

@NgModule({
  declarations: [FaqFormComponent, FormThxComponent, FaqFormViewComponent, ServicesFormComponent, ServiceFormViewComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatDividerModule,
    ErrorCardComponent,
    MatProgressBarModule,
    MatIconModule,
  ],
})
export class MyFormsModule {}
