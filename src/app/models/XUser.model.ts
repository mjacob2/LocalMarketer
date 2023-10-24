import { XClient } from './XClient.model';

export class XUser {
  public id?: number;
  public creationDate?: Date;
  public firstName?: string;
  public lastName?: string;
  public email?: string;
  public phone?: string;
  public password?: string;
  public role?: string;
  public hasAccess?: boolean;
  public clients?: XClient[];
  public authData?: string;
}
