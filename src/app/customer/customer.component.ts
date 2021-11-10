import { Component, OnInit } from '@angular/core';
import {Customer} from "../shared/models/customer.model";
import {CustomerService} from "../shared/services/customer.service";

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

  customerList: Customer[] = [];

  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
    this.getAllCustomers();
  }

  private getAllCustomers(): void {
    this.customerService.getAllCustomers().subscribe(customers => this.customerList = customers);
  }

}
