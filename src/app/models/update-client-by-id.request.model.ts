import { ClientUser } from './ClientUser.model';

export class UpdateClientByIdRequestModel {
  clientId?: number;
  name?: string;
  googleGroupId?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  email?: string;
  source?: string;
  description?: string;
  clientUsers?: ClientUser[];
}
