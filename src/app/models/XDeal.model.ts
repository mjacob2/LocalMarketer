import { XPackage } from './XPackage.model';
import { XToDo } from './XToDo.model';

export class XDeal {
  public dealId?: number;
  public creationDate?: Date;
  public creatorId?: number;
  public profileId?: number;
  public endDate?: Date;
  public name?: string;
  public package?: XPackage;
  public selectedPackage: XPackage | undefined | null;
  public price?: number;
  public description?: string;
  public stage?: string;
  public toDos?: XToDo[];

  // for Add Deal Request
  public profileName?: string;
  public clientEmail?: string;
}
