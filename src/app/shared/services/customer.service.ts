import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Customer, CustomerData} from "../models/customer.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private customerUrl = environment.backendUrl + 'web/customers';

  constructor(private http: HttpClient) { }

  getAllFilteredCustomers(page: number, size: number, searchValue: string | null, active: boolean | null, subscription: string | null): Observable<CustomerData> {
    let params = new HttpParams();

    params = params.append('page', String(page));
    params = params.append('limit', String(size));
    if (searchValue) {
      params = params.append('queryValue', searchValue);
    }
    if (active) {
      params = params.append('active', active);
    }
    if (subscription) {
      params = params.append('subscription', subscription);
    }

    return this.http.get<CustomerData>(this.customerUrl, { params, withCredentials: true});
  }

  updateCustomer(customer: Customer): Observable<Customer> {
    return this.http.put<Customer>(this.customerUrl, customer, { withCredentials: true});
  }
}
