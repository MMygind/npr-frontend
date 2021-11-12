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
  displayedColumns: string[] = ['name', 'email', 'phonenumber', 'creationdate', 'subscription', 'licenseplates', 'active'];
  dataSource = this.customerList;
  statusList = [
    { value: 'active', text: 'Aktiv'},
    { value: 'deactivated', text: 'Deaktiveret'}]

  customerTypeList = [
    { value: 'subscription', text: 'Abonnement'},
    { value: 'washclub', text: 'Vaskeklub'},
    { value: 'company', text: 'Firmaaftale'}]


  constructor(private customerService: CustomerService, public datepipe: DatePipe) { }

  ngOnInit(): void {
    this.getAllCustomers();
  }

  private getAllCustomers(): void {
    this.customerService.getAllCustomers().subscribe(customers => this.customerList = customers);
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

}
