import {Subscription} from "./subscription.model";
import {Transaction} from "./transaction.model";

export interface Customer {
  id?: number;
  name: string;
  email: string;
  creationDate: Date;
  phoneNumber: string;
  subscription: Subscription;
  licensePlates: string[];
  active: boolean;
}

export interface CustomerData {
  items: Customer[],
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
