import {Company} from "./company.model";
import {WashType} from "./washtype.model";

export interface LocationModel {
  id?: number;
  company?: Company;
  name: string;
  address: string;
  postalCode: number;
  city: string;
  latitude?: number;
  longitude?: number;
  washTypes: WashType[]
}
