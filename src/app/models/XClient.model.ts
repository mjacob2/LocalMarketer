import { XUser } from './XUser.model';
import { XProfile } from './XProfile.model';
import { ClientUser } from './ClientUser.model';

export class XClient {
  public clientId?: number;
  public creationDate?: Date;
  public name?: string;
  public googleGroupId?: string;
  public firstName?: string;
  public lastName?: string;
  public phone?: string;
  public email?: string;
  public description?: string;
  public creatorId?: number;
  public profiles?: XProfile[];
  public users?: XUser[];
  public clientUsers?: ClientUser[];

  public sellerFullName?: string;
  public localMarketerFullName?: string;
  public creatorFullName?: string;
}
