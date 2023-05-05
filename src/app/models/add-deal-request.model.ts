export class AddDealRequestModel {
  public packageId?: number;
  public selectedPackageMinPrice?: number;
  public profileId?: number;
  public name?: string;
  public price?: number;
  public endDate?: Date;
  public profileName?: string;
  public clientEmail?: string;
  public stage: string = 'domyslny stage';
  public description: string = '';
}
