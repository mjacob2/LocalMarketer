export interface UserList {
  id: number;
  creationDate: Date;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  role: string;
  accesDenied: boolean;
  profilesCount: number;
  doDosCount: number;
}
