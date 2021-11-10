import {Customer} from "./customer.model";

export interface Licenseplate {
  id?: number;
  customer: Customer;
  licensePlate: string;
}
