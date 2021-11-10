import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionRoutingModule } from './transaction-routing.module';
import { TransactionComponent } from './transaction.component';
import { TransactionListComponent } from './transaction-list/transaction-list.component';
import {TransactionDetailsComponent} from "./transaction-details/transaction-details.component";


@NgModule({
  declarations: [
    TransactionComponent,
    TransactionListComponent,
    TransactionDetailsComponent,
  ],
    imports: [
        CommonModule,
        TransactionRoutingModule,
    ]
})
export class TransactionModule { }
