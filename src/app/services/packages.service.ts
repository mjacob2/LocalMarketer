import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { XPackage } from '../models/XPackage.model';

@Injectable({
  providedIn: 'root',
})
export class PackagesService {
  constructor(private http: HttpService) {}

  async getAllPackages() {
    return await this.http.get<XPackage[]>('/packages');
  }
}
