import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { DealsList } from '../models/dealsList.model';

@Injectable({
  providedIn: 'root',
})
export class DealsService {
  constructor(private http: HttpService) {}

  async getAllDeals() {
    return await this.http.get<DealsList[]>('/deals');
  }
}
