import {Customer} from "./customer.model";

export interface Account {
  id?: number;
  balance: number;
  customer: Customer;
}
