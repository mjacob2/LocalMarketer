import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { XProfile } from '../models/XProfile.model';

@Injectable({
  providedIn: 'root',
})
export class ProfilesService {
  constructor(private http: HttpService) {}

  async addProfile(profile: XProfile) {
    return await this.http.post<XProfile>(`/profiles`, profile);
  }

  async getAllProfiles(queryParameters?: string) {
    return await this.http.get<XProfile[]>(`/profiles${queryParameters}`);
  }

  async getProfileById(id: number) {
    return await this.http.get<XProfile>(`/profiles/${id}`);
  }

  async updateProfileById(profile: XProfile) {
    return await this.http.put<XProfile>(
      `/profiles/${profile.profileId}`,
      profile
    );
  }

  async deleteProfileById(id: number) {
    return await this.http.delete<XProfile>(`/profiles/${id}`);
  }
}
