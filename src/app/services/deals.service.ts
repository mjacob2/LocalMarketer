import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { XDeal } from '../models/XDeal.model';

@Injectable({
  providedIn: 'root',
})
export class DealsService {
  constructor(private http: HttpService) {}

  async getAllDeals() {
    return await this.http.get<XDeal[]>('/deals');
  }

  async getDealById(id: number) {
    return await this.http.get<XDeal>(`/deals/${id}`);
  }

  async updateDealById(deal: XDeal) {
    return await this.http.put<XDeal>(`/deals/${deal.dealId}`, deal);
  }

  async deleteDealById(id: number) {
    return await this.http.delete<XDeal>(`/deals/${id}`);
  }

  async addDeal(deal: XDeal) {
    return await this.http.post<XDeal>(`/deals`, deal);
  }
}
