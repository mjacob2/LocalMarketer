import { ClientUser } from './ClientUser.model';
import { ProfileGeneral } from './profileGeneral.model';
import { UserList } from './user-list.model';

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
  users?: UserList[];
  clientUsers?: ClientUser[];
  sellerId: number | null | undefined;
  userId: number | null | undefined;
}
