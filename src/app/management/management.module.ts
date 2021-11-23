import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagementRoutingModule } from './management-routing.module';
import { ManagementComponent } from './management.component';
import { MatListModule } from "@angular/material/list";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatDividerModule} from "@angular/material/divider";
import {MatCardModule} from "@angular/material/card";
import { CreateEditLocationComponent } from './create-edit-location/create-edit-location.component';
import { CreateEditWashtypeComponent } from './create-edit-washtype/create-edit-washtype.component';
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import { ErrorAlertComponent } from './error-alert/error-alert.component';
import {MatDialogModule} from "@angular/material/dialog";


@NgModule({
  declarations: [
    ManagementComponent,
    CreateEditLocationComponent,
    CreateEditWashtypeComponent,
    ErrorAlertComponent
  ],
  imports: [
    CommonModule,
    ManagementRoutingModule,
    MatListModule,
    MatDividerModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    FlexLayoutModule,
  ]
})
export class ManagementModule { }
