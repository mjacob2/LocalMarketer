export interface UserList {
  id: number;
  creationDate: Date;
  firstName: string;
  lastname: string;
  email: string;
  phone: string;
  role: string;
  accesDenied: boolean;
  profilesCount: number;
  toDosCount: number;
}
