import { ProfileGeneral } from './profileGeneral.model';

export class Client {
  firstName: string = '';
  lastName: string = '';
  phone?: string;
  email?: string;
  source?: string;
  description?: string;
  id?: number;
  creationDate?: Date;
  profiles?: ProfileGeneral[];
}
