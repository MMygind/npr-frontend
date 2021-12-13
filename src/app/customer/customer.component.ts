import { Component, OnInit } from '@angular/core';
import {Customer} from "../shared/models/customer.model";
import {CustomerService} from "../shared/services/customer.service";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

  customerList: Customer[] = [];
  chosenCustomer: Customer | undefined;
  displayedColumns: string[] = ['name', 'email', 'phonenumber', 'creationdate', 'subscription', 'licenseplates', 'active'];
  dataSource = this.customerList;
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

  constructor(private customerService: CustomerService, public datepipe: DatePipe) {
  }

  ngOnInit(): void {
    this.getAllCustomers(null, null);
  }

  private getAllCustomers(active: boolean | null, subscription: string | null): void {
    this.customerService.getAllFilteredCustomers(active, subscription).subscribe(customers => this.customerList = customers);
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
    this.getAllCustomers(this.selectedStatus, this.selectedType);
  }
}
