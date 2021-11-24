import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {WashType} from "../../shared/models/washtype.model";
import {Company} from "../../shared/models/company.model";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmationAlertComponent} from "../confirmation-alert/confirmation-alert.component";

@Component({
  selector: 'app-create-edit-washtype',
  templateUrl: './create-edit-washtype.component.html',
  styleUrls: ['./create-edit-washtype.component.scss']
})
export class CreateEditWashtypeComponent implements OnInit {

  @Input() washType?: WashType;
  @Output() washTypeEvent = new EventEmitter<WashType>();
  actionInProgress = false;
  defaultCompany: Company;

  constructor(private dialog: MatDialog) {
    this.defaultCompany = {
      id: 1,
      name: '',
      phoneNumber: '',
      creationDate: new Date(),
      email: '',
    }
  }

  ngOnInit(): void {}

  saveWashType() {
    this.actionInProgress = true;
    const washTypeToReturn: WashType = {
      company: this.defaultCompany,
      name: 'New wash type',
      price: 1,
    }
    if (this.washType) {
      washTypeToReturn.id = this.washType.id;
      washTypeToReturn.name = this.washType.name;
      washTypeToReturn.company = undefined;
      washTypeToReturn.price = this.washType.price;
    }
    const dialogMessage = (this.washType)
      ? `Opdatere ${washTypeToReturn.name}?` : `Oprette ${washTypeToReturn.name}?`;
    const dialogRef = this.dialog.open(ConfirmationAlertComponent,
      { data: { message: dialogMessage },
      });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.washTypeEvent.emit(washTypeToReturn);
      }
      this.actionInProgress = false;
    });
  }

}
