import { DealGeneral } from './dealGeneral.mode';
import { ToDoGeneral } from './todoGeneral.model';

export class Profile {
  public name?: string; //
  public creatorId?: number;
  public userId?: number;
  public clientId?: number;
  public source?: string;
  public websiteUrl?: string;
  public profileUrl?: string;
  public description?: string;
  public voivodeship?: string; //
  public city?: string; //
  public street?: string; //
  public postCode?: string; //
  public nip?: string;
  public regon?: string; //
  public phone?: string; //
  public email?: string; //
  public customerService?: string; //
  public activities?: ToDoGeneral[];
  public deals?: DealGeneral[];
  public id?: number;
  public creationDate?: Date;
}
