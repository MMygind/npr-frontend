import {Licenseplate} from "./licenseplate.model";
import {Washtype} from "./washtype.model";

export interface Transaction {
  id?: number;
  washType: Washtype;
  location: Location;
  licensePlate: Licenseplate;
  timestamp: Date;
  imageURL: string;
}
