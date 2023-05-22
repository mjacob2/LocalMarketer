import { Package } from './package.model';
import { User } from './user.model';

export class AddDealRequestModel {
  constructor(
    public profileId?: number,
    public sellerFullName?: string,
    public sellerId?: number,
    public selectedPackage: Package | null = null, // Set selectedPackage to null by default
    public name?: string,
    public price?: number,
    public description?: string,
    public profileName?: string,
    public clientEmail?: string
  ) {}
}
