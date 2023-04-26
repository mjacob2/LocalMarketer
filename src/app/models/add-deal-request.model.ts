export class AddDealRequestModel {
  public packageId?: number;
  public profileId?: number;
  public name?: string;
  public price?: number;
  public endDate?: Date;
  public stage: string = 'domyslny stage';
  public description: string = '';
}
