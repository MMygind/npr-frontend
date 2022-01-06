import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerComponent } from './customer.component';
import { MatTableModule } from '@angular/material/table';
import {CdkTableModule} from "@angular/cdk/table";
import {MatOption, MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatIconModule, MatIconRegistry} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatPaginatorModule} from "@angular/material/paginator";


@NgModule({
  providers: [DatePipe],
  declarations: [
    CustomerComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    MatTableModule,
    CdkTableModule,
    MatSelectModule,
    MatOptionModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatExpansionModule,
    ReactiveFormsModule,
    MatPaginatorModule
  ]
})
export class CustomerModule { }
