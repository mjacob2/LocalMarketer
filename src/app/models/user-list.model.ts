import { ClientUser } from './ClientUser.model';

export interface UserList {
  id: number;
  creationDate: Date;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
  accesDenied: boolean;
  profilesCount: number;
  toDosCount: number;
}
