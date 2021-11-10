import {Company} from "./company.model";

export interface Location {
  id?: number;
  company: Company;
  name: string;
  address: string;
  postalCode: number;
  city: string;
  latitude?: number;
  longitude?: number;
}
