import { Component, OnInit } from '@angular/core';
import {Transaction} from "../../shared/models/transaction.model";
import {TransactionService} from "../../shared/services/transaction.service";
import {SelectionModel} from "@angular/cdk/collections";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss']
})
export class TransactionListComponent implements OnInit {

  transactionList: Transaction[] = [];
  displayedColumns: string[] = ['license plate', 'wash type', 'location', 'timestamp', 'customer type', 'price']

  constructor(private transactionService: TransactionService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.getAllTransactions();
  }

  private getAllTransactions(): void {
    this.transactionService.getAllTransactions().subscribe(transactions => this.transactionList = transactions);
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

}
