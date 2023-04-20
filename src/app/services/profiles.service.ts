import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { ProfilesList } from '../models/profilesList.model';
import { Profile } from '../models/profile.model';
import { AddProfileRequestModel } from '../models/add-profile-request.model';

@Injectable({
  providedIn: 'root',
})
export class ProfilesService {
  constructor(private http: HttpService) {}

  async addProfile(profile: AddProfileRequestModel) {
    return await this.http.post<AddProfileRequestModel>(`/profiles`, profile);
  }

  async getAllProfiles() {
    return await this.http.get<ProfilesList[]>('/profiles');
  }

  async getProfileById(id: number) {
    return await this.http.get<Profile>(`/profiles/${id}`);
  }

  async updateProfileById(profile: Profile) {
    return await this.http.put<Profile>(`/profiles/${profile.id}`, profile);
  }
}
