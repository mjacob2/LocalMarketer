export interface GetAllUsersResponse {
  userId: number;
  creationDate: Date;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
  hasAcces: boolean;
  profilesCount: number;
  toDosCount: number;
}
