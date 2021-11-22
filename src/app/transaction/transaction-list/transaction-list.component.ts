import { Component, OnInit } from '@angular/core';
import {TransactionData} from "../../shared/models/transaction.model";
import {TransactionService} from "../../shared/services/transaction.service";
import {DatePipe} from "@angular/common";
import {PageEvent} from "@angular/material/paginator";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss']
})
export class TransactionListComponent implements OnInit {

  dataSource: TransactionData | undefined;
  searchValue: string = "";
  displayedColumns: string[] = ['license plate', 'name', 'wash type', 'location', 'timestamp', 'customer type', 'price']
  customerTypeList = [
    { value: 'companyagreement', text: 'Firmaaftale'},
    { value: 'washclub', text: 'Vaskeklub'},
    { value: 'subscription', text: 'Abonnement'}
  ]

  pageEvent: PageEvent | undefined;

  constructor(private transactionService: TransactionService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.getAllTransactions();
  }

  private getAllTransactions(): void {
    this.transactionService.getAllTransactions(1, 10).pipe(map((transactionData: TransactionData) => this.dataSource = transactionData)).subscribe();
  }

  public getDateWithFormat(date: Date): string {
    let dateWithFormat = this.datePipe.transform(date, 'dd-MM-yyyy');

    if(dateWithFormat != null) {
      return dateWithFormat;
    }
    else {
      return "";
    }
  }

  public onPaginateChange(event: PageEvent) {
    let page = event.pageIndex;
    let size = event.pageSize;

    page = page +1; //There is nothing on page 0

    if(this.searchValue == null || this.searchValue == "") {
      this.transactionService.getAllTransactions(page, size).pipe(map((transactionData: TransactionData) => this.dataSource = transactionData)).subscribe();
    } else {

      this.transactionService.getFilteredTransactions(page, size, this.searchValue).pipe(map((transactionData: TransactionData) => this.dataSource = transactionData)).subscribe()
    }
  }

  public searchForTransactions(queryString: string) {
    console.log(queryString);
    console.log(this.dataSource)
    this.transactionService.getFilteredTransactions(1, 10, queryString).pipe(map((transactionData: TransactionData) => this.dataSource = transactionData)).subscribe()
  }
}
