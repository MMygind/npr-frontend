import { Component, OnInit } from '@angular/core';
import {Customer, CustomerData} from "../shared/models/customer.model";
import {CustomerService} from "../shared/services/customer.service";
import {DatePipe} from "@angular/common";
import {map} from "rxjs/operators";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

  dataSource: CustomerData | undefined;
  chosenCustomer: Customer | undefined;
  displayedColumns: string[] = ['name', 'email', 'phonenumber', 'creationdate', 'subscription', 'licenseplates', 'active'];
  statusList = [
    { value: 'true', text: 'Aktiv'},
    { value: 'false', text: 'Deaktiveret'}]

  customerTypeList = [
    { value: 'Abonnement', text: 'Abonnement'},
    { value: 'Vaskeklub', text: 'Vaskeklub'},
    { value: 'Firmaaftale', text: 'Firmaaftale'}]

  selection: boolean = false;
  selectedType: string | null = null;
  selectedStatus: boolean | null = null;
  searchValue: string | null = null;

  constructor(private customerService: CustomerService, public datepipe: DatePipe, private route: ActivatedRoute) {
    if(route.snapshot.params)
    {
      this.route.queryParams.subscribe(params => {
        this.searchValue = params['searchString'];
        this.updateList();
      })
    }
  }

  ngOnInit(): void {
    this.getAllCustomers();
  }

  private getAllCustomers(): void {
    this.customerService.getAllFilteredCustomers(1, 10, this.searchValue, this.selectedStatus, this.selectedType ).pipe(map((customerData: CustomerData) => this.dataSource = customerData)).subscribe();
  }

  public getDateWithFormat(date: Date): string {
    let dateWithFormat = this.datepipe.transform(date, 'dd-MM-yyyy');

    if(dateWithFormat != null) {
      return dateWithFormat;
    }
    else {
      return "";
    }
  }

  public setChosenCustomer(customer: Customer) {
    this.chosenCustomer = customer;
  }

  public changeCustomerStatus() {
    if(this.chosenCustomer != undefined) {
      this.chosenCustomer.active = !this.chosenCustomer.active;

      this.customerService.updateCustomer(this.chosenCustomer).subscribe();
    }
  }

  public updateList() {
    this.getAllCustomers();

    console.log("hello")
  }
}
