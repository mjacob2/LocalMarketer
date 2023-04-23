import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { DealsList } from '../models/dealsList.model';
import { Deal } from '../models/deal.model';

@Injectable({
  providedIn: 'root',
})
export class DealsService {
  constructor(private http: HttpService) {}

  async getAllDeals() {
    return await this.http.get<DealsList[]>('/deals');
  }

  async getDealById(id: number) {
    return await this.http.get<Deal>(`/deals/${id}`);
  }

  async updateDealById(deal: Deal) {
    return await this.http.put<Deal>(`/deals/${deal.id}`, deal);
  }
}
