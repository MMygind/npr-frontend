import {Component, OnInit, Pipe, PipeTransform} from '@angular/core';
import {Transaction, TransactionData} from "../../shared/models/transaction.model";
import {TransactionService} from "../../shared/services/transaction.service";
import {DatePipe} from "@angular/common";
import {PageEvent} from "@angular/material/paginator";
import {map} from "rxjs/operators";
import {LocationModel} from "../../shared/models/location.model";
import {LocationService} from "../../shared/services/location.service";
import {WashTypeService} from "../../shared/services/washtype.service";
import {WashType} from "../../shared/models/washtype.model";
import {DateAdapter} from "@angular/material/core";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss']
})
export class TransactionListComponent implements OnInit {

  dataSource: TransactionData | undefined;
  chosenTransaction: Transaction | undefined;
  locations: LocationModel[] = [];
  washTypes: WashType[] = [];
  searchValue: string | null = null;
  startDate: any = Date.parse('foo');
  endDate: any = Date.parse('foo');
  washType: string = "";
  location: string = "";
  customerType: string = "";
  displayedColumns: string[] = ['license plate', 'email', 'wash type', 'location', 'timestamp', 'customer type', 'price']
  customerTypeList = [
    { value: 'firmaaftale', text: 'Firmaaftale'},
    { value: 'vaskeklub', text: 'Vaskeklub'},
    { value: 'abonnement', text: 'Abonnement'}
  ]

  pageEvent: PageEvent | undefined;

  constructor(private transactionService: TransactionService, private locationService: LocationService, private washTypeService: WashTypeService, private datePipe: DatePipe, private dateAdapter: DateAdapter<Date>, private route: ActivatedRoute, private router: Router) {
    this.dateAdapter.setLocale('en-GB'); //dd/MM/yyyy

    if(route.snapshot.params) {
      this.route.queryParams.subscribe(params => {
        this.searchValue = params['searchString'];
        this.filterTransactions();
      })
    }
  }

  ngOnInit(): void {
    this.filterTransactions();
    this.getCompanyLocations();
    this.getAllWashTypes();
  }

  private getAllWashTypes() {
    this.washTypeService.getAllWashTypes().subscribe(washTypes => this.washTypes = washTypes);
  }

  private getCompanyLocations() {
    this.locationService.getCompanyLocations().subscribe(locations => this.locations = locations);
  }

  public setChosenTransaction(transaction: Transaction) {
    this.chosenTransaction = transaction;
  }

  public redirectToCustomer() {
    this.router.navigateByUrl('/customers?searchString=' + this.chosenTransaction?.licensePlate.customer.email)
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

    this.transactionService.getFilteredTransactions(page, size, this.searchValue, this.formatDateForDb(this.startDate), this.formatDateForDb(this.endDate), this.washType, this.location, this.customerType).pipe(map((transactionData: TransactionData) => this.dataSource = transactionData)).subscribe();

  }

  public filterTransactions() {
    this.transactionService.getFilteredTransactions(1, 10, this.searchValue, this.formatDateForDb(this.startDate), this.formatDateForDb(this.endDate), this.washType, this.location, this.customerType).pipe(map((transactionData: TransactionData) => this.dataSource = transactionData)).subscribe();
  }
}
