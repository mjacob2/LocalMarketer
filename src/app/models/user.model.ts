export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  authData: string;
  role: Roles;
}

export enum Roles {
  Administrator = 0,
  Manager = 1,
  LocalMarketer = 2,
  Seller = 3,
}
