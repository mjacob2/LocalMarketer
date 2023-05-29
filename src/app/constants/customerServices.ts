import { CustomerService } from '../models/customer-service.model';

export class Constants {
  public static customerServices: CustomerService[] = [
    { value: 'insideOnly', viewValue: 'Tylko na miejscu' },
    { value: 'awayOnly', viewValue: 'Tylko z dojazdem' },
    { value: 'insideAndAway', viewValue: 'Na miejscu i z dojazdem' },
  ];
}
