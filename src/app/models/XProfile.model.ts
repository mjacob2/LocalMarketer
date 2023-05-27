import { XDeal } from './XDeal.model';

export class XProfile {
  public profileId?: number;
  public creationDate?: Date;
  public name?: string;
  public googleProfileId?: string;
  public creatorId?: number;
  public clientId?: number;
  public clientName?: string;
  public websiteUrl?: string;
  public profileUrl?: string;
  public description?: string;
  public voivodeship?: string;
  public city?: string;
  public street?: string;
  public postCode?: string;
  public phone?: string;
  public mediaLink?: string;
  public customerService?: string;
  public deals?: XDeal[];
  public clientEmail?: string;

  public sellerFullName?: string;
  public localMarketerFullName?: string;
  public creatorFullName?: string;
}
