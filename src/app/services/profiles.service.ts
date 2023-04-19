import { Injectable } from '@angular/core';
import { ClientList } from '../models/clientList.model';
import { HttpService } from './http.service';
import { Client } from '../models/client.model';
import { ProfileGeneral } from '../models/profileGeneral.model';
import { ProfilesList } from '../models/profilesList.model';

@Injectable({
  providedIn: 'root',
})
export class ProfilesService {
  constructor(private http: HttpService) {}

  async addProfile(profile: ProfileGeneral) {
    return await this.http.post<ProfileGeneral>(`/profiles`, profile);
  }

  async getAllProfiles() {
    return await this.http.get<ProfilesList[]>('/profiles');
  }
}
