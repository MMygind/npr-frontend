import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {LocationModel} from "../../shared/models/location.model";
import {Company} from "../../shared/models/company.model";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmationAlertComponent} from "../confirmation-alert/confirmation-alert.component";

@Component({
  selector: 'app-create-edit-location',
  templateUrl: './create-edit-location.component.html',
  styleUrls: ['./create-edit-location.component.scss']
})
export class CreateEditLocationComponent implements OnInit {

  @Input() location?: LocationModel;
  @Output() locationEvent = new EventEmitter<LocationModel>();
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

  saveLocation() {
    this.actionInProgress = true;
    const locationToReturn: LocationModel = {
      company: this.defaultCompany,
      name: 'New company',
      address: 'Nystræde 1',
      postalCode: 1000,
      city: 'Hovedstaden',
      washTypes: [],
      longitude: 0,
      latitude: 0,
    }
    if (this.location) {
      locationToReturn.id = this.location.id;
      locationToReturn.company = this.location.company;
      locationToReturn.name = this.location.name;
      locationToReturn.address = this.location.address;
      locationToReturn.postalCode = this.location.postalCode;
      locationToReturn.city = this.location.city;
      locationToReturn.washTypes = this.location.washTypes;
      locationToReturn.longitude = this.location.longitude;
      locationToReturn.latitude = this.location.latitude;
    }
    const dialogMessage = (this.location)
      ? `Opdatere ${locationToReturn.name}?` : `Oprette ${locationToReturn.name}?`;
    const dialogRef = this.dialog.open(ConfirmationAlertComponent,
      { data: { message: dialogMessage },
      });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.locationEvent.emit(locationToReturn);
      }
      this.actionInProgress = false;
    });
  }

}
