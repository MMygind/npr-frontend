import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {LocationModel} from "../../shared/models/location.model";
import {Company} from "../../shared/models/company.model";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmationAlertComponent} from "../confirmation-alert/confirmation-alert.component";
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-create-edit-location',
  templateUrl: './create-edit-location.component.html',
  styleUrls: ['./create-edit-location.component.scss']
})
export class CreateEditLocationComponent implements OnInit, OnChanges {

  @Input() location?: LocationModel;
  @Output() locationEvent = new EventEmitter<LocationModel>();
  actionInProgress = false;
  defaultCompany: Company;
  locationForm = this.fb.group({
    name: [null, Validators.required],
    address: [null, Validators.required],
    postalCode: [null, [Validators.required, Validators.min(1000), Validators.max(9999)]],
    city: [null, Validators.required],
  })

  constructor(private dialog: MatDialog,
              private fb: FormBuilder) {
    // to be removed later!
    this.defaultCompany = {
      id: 1,
      name: '',
      phoneNumber: '',
      creationDate: new Date(),
      email: '',
    }
  }

  ngOnInit(): void {
    this.updateForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.updateForm();
  }

  updateForm() {
    if (this.location) {
      this.locationForm.patchValue({
        name: this.location.name,
        address: this.location.address,
        postalCode: this.location.postalCode,
        city: this.location.city,
      });
    } else {
      this.locationForm.reset();
    }
  }

  saveLocation() {
    this.actionInProgress = true;
    const locationToReturn: LocationModel = {
      company: this.defaultCompany,
      name: this.locationForm.value.name,
      address: this.locationForm.value.address,
      postalCode: this.locationForm.value.postalCode,
      city: this.locationForm.value.city,
      washTypes: [],
      longitude: 0,
      latitude: 0,
    }
    if (this.location) {
      locationToReturn.id = this.location.id;
      locationToReturn.company = this.location.company;
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
