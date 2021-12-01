import {Component, OnInit, Pipe, PipeTransform} from '@angular/core';
import {TransactionData} from "../../shared/models/transaction.model";
import {TransactionService} from "../../shared/services/transaction.service";
import {DatePipe} from "@angular/common";
import {PageEvent} from "@angular/material/paginator";
import {map} from "rxjs/operators";
import {LocationModel} from "../../shared/models/location.model";
import {LocationService} from "../../shared/services/location.service";
import {WashTypeService} from "../../shared/services/washtype.service";
import {WashType} from "../../shared/models/washtype.model";
import {DateAdapter} from "@angular/material/core";

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss']
})
export class TransactionListComponent implements OnInit {

  dataSource: TransactionData | undefined;
  locations: LocationModel[] = [];
  washTypes: WashType[] = [];
  searchValue: string = "";
  startDate: any = Date.parse('foo');
  endDate: any = Date.parse('foo');
  washType: string = "";
  location: string = "";
  customerType: string = "";
  displayedColumns: string[] = ['license plate', 'name', 'wash type', 'location', 'timestamp', 'customer type', 'price']
  customerTypeList = [
    { value: 'firmaaftale', text: 'Firmaaftale'},
    { value: 'vaskeklub', text: 'Vaskeklub'},
    { value: 'abonnement', text: 'Abonnement'}
  ]

  pageEvent: PageEvent | undefined;

  constructor(private transactionService: TransactionService, private locationService: LocationService, private washTypeService: WashTypeService, private datePipe: DatePipe, private dateAdapter: DateAdapter<Date>) {
    this.dateAdapter.setLocale('en-GB'); //dd/MM/yyyy
  }

  ngOnInit(): void {
    this.getAllTransactions();
    this.getAllLocations();
    this.getAllWashTypes();
  }

  private getAllTransactions(): void {
    this.transactionService.getAllTransactions(1, 10).pipe(map((transactionData: TransactionData) => this.dataSource = transactionData)).subscribe();

  }

  private getAllWashTypes() {
    this.washTypeService.getAllWashTypes().subscribe(washTypes => this.washTypes = washTypes);
  }

  private getAllLocations() {
    this.locationService.getAllLocations().subscribe(locations => this.locations = locations);
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

  public formatDateForDb(date: Date): string {
    let dateWithFormat = this.datePipe.transform(date, 'yyyy-MM-dd');

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

    if(this.searchValue == null && this.endDate == null && this.washType == null && this.location == null && this.customerType == null || this.searchValue == "" && this.endDate.toString() == "" && this.washType == "" && this.location == "" && this.customerType == "") {
      this.transactionService.getAllTransactions(page, size).pipe(map((transactionData: TransactionData) => this.dataSource = transactionData)).subscribe();
    } else {
      this.transactionService.getFilteredTransactions(page, size, this.searchValue, this.formatDateForDb(this.startDate), this.formatDateForDb(this.endDate), this.washType, this.location, this.customerType).pipe(map((transactionData: TransactionData) => this.dataSource = transactionData)).subscribe()
    }
  }

  public searchForTransactions(queryString: string) {
    this.transactionService.getFilteredTransactions(1, 10, queryString, this.formatDateForDb(this.startDate), this.formatDateForDb(this.endDate), this.washType, this.location, this.customerType).pipe(map((transactionData: TransactionData) => this.dataSource = transactionData)).subscribe()
  }

  public filterByStartDate(startDate: Date) {
    if (startDate !== null && this.endDate !== null)
    {
      this.transactionService.getFilteredTransactions(1, 10, this.searchValue, this.formatDateForDb(startDate), this.formatDateForDb(this.endDate), this.washType, this.location, this.customerType).pipe(map((transactionData: TransactionData) => this.dataSource = transactionData)).subscribe()
    }
  }

  public filterByEndDate(endDate: Date) {
    if (this.startDate !== null && endDate !== null)
    {
      this.transactionService.getFilteredTransactions(1, 10, this.searchValue, this.formatDateForDb(this.startDate), this.formatDateForDb(endDate), this.washType, this.location, this.customerType).pipe(map((transactionData: TransactionData) => this.dataSource = transactionData)).subscribe()
    }
  }

  public filterByWashType(washType: string) {
    this.transactionService.getFilteredTransactions(1, 10, this.searchValue, this.formatDateForDb(this.startDate), this.formatDateForDb(this.endDate), washType, this.location, this.customerType).pipe(map((transactionData: TransactionData) => this.dataSource = transactionData)).subscribe()
  }

  public filterByLocation(location: string) {
    this.transactionService.getFilteredTransactions(1, 10, this.searchValue, this.formatDateForDb(this.startDate), this.formatDateForDb(this.endDate), this.washType, location, this.customerType).pipe(map((transactionData: TransactionData) => this.dataSource = transactionData)).subscribe()
  }

  public filterByCustomerType(customerType: string) {
    this.transactionService.getFilteredTransactions(1, 10, this.searchValue, this.formatDateForDb(this.startDate), this.formatDateForDb(this.endDate), this.washType, this.location, customerType).pipe(map((transactionData: TransactionData) => this.dataSource = transactionData)).subscribe()
  }


}
