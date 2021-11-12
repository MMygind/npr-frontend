import {Licenseplate} from "./licenseplate.model";
import {Washtype} from "./washtype.model";
import {LocationModel} from "./location.model";

export interface Transaction {
  id?: number;
  washType: Washtype;
  location: LocationModel;
  licensePlate: Licenseplate;
  timestamp: Date;
  imageURL: string;
}
