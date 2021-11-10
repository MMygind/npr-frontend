import {Company} from "./company.model";

export interface Washtype {
  id?: number;
  name: string;
  price: number;
  company: Company;
}
