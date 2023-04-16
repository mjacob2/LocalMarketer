import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  imports: [MatCardModule],
  standalone: true,
  selector: 'app-error-card',
  templateUrl: './error-card.component.html',
  styleUrls: ['./error-card.component.scss'],
})
export class ErrorCardComponent {
  @Input()
  errorMessage: string | undefined;
}
