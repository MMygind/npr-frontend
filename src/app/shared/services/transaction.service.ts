import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {TransactionData} from "../models/transaction.model";

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private transactionUrl = environment.backendUrl + 'transactions';

  constructor(private http: HttpClient) {}

  getAllTransactions(page: number, size: number): Observable<TransactionData> {
    let params = new HttpParams();

    params = params.append('page', String(page));
    params = params.append('limit,', String(size));

    return this.http.get<TransactionData>(this.transactionUrl, {params});
  }

  getFilteredTransactions(page: number, size: number, searchValue: string, startDate: string, endDate: string, washType: string, location: string, customerType: string): Observable<TransactionData>
  {
    let params = new HttpParams();

    params = params.append('page', String(page));
    params = params.append('limit', String(size));
    params = params.append('queryValue', searchValue);
    params = params.append('startDate', startDate);
    params = params.append('endDate', endDate);
    params = params.append('washType', washType);
    params = params.append('location', location);
    params = params.append('customerType', customerType)

    return this.http.get<TransactionData>(this.transactionUrl, {params});
  }
}
