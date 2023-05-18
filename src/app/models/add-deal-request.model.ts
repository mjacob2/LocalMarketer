import { Package } from './package.model';
import { User } from './user.model';

export class AddDealRequestModel {
  profileId?: number;
  sellerFullName?: string;
  sellerId?: number;
  selectedPackage?: Package;
  name?: string;
  price?: number;
  description?: string;
  profileName?: string;
  clientEmail?: string;
}
