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

export interface TransactionData {
  items: Transaction[],
  meta: {
    totalItems: number,
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  }
  links: {
    first: string;
    previous: string;
    next: string;
    last: string;
  }
}
