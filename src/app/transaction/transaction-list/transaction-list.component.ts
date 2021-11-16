import { Component, OnInit } from '@angular/core';
import {TransactionData} from "../../shared/models/transaction.model";
import {TransactionService} from "../../shared/services/transaction.service";
import {DatePipe} from "@angular/common";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss']
})
export class TransactionListComponent implements OnInit {

  dataSource: TransactionData | undefined;
  displayedColumns: string[] = ['license plate', 'wash type', 'location', 'timestamp', 'customer type', 'price']

  pageEvent: PageEvent | undefined;

  constructor(private transactionService: TransactionService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.getAllTransactions();
  }

  private getAllTransactions(): void {
    this.transactionService.getAllTransactions(1, 10).subscribe(transactions => this.dataSource = transactions);
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

    this.transactionService.getAllTransactions(page, size).subscribe(transactions => this.dataSource = transactions)
  }
}
