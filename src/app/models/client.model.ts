import { ProfileGeneral } from './profileGeneral.model';

export class Client {
  name: string = '';
  googleGroupId: string = '';
  firstName: string = '';
  lastName: string = '';
  phone?: string;
  email?: string;
  source?: string;
  description?: string;
  id?: number;
  creationDate?: Date;
  profiles?: ProfileGeneral[];
  sellerId: number | null | undefined;
}
