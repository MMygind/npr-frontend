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

  getAllCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.customerUrl);
  }
}
