import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Customer} from "../models/customer.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private customerUrl = environment.backendUrl + 'customers';

  constructor(private http: HttpClient) { }

  getAllFilteredCustomers(active: boolean | null, subscription: string | null): Observable<Customer[]> {
    let url = this.customerUrl;

    if (active != null) {
      url = url + "?active=" + active;
    }
    if (subscription != null && active == null) {
      url = url + "?subscription=" + subscription;
    }
    else if (subscription != null && active != null) {
      url = url + "&subscription=" + subscription;
    }

    let list = this.http.get<Customer[]>(url);

    return list;
  }

  updateCustomer(customer: Customer): Observable<Customer> {
    return this.http.put<Customer>(this.customerUrl, customer);
  }
}
