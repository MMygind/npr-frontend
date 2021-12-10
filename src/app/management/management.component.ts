import { Component, OnInit } from '@angular/core';
import {LocationService} from "../shared/services/location.service";
import {WashTypeService} from "../shared/services/washtype.service";
import {LocationModel} from "../shared/models/location.model";
import {WashType} from "../shared/models/washtype.model";
import {MatDialog} from "@angular/material/dialog";
import {ErrorAlertComponent} from "./error-alert/error-alert.component";
import {ConfirmationAlertComponent} from "./confirmation-alert/confirmation-alert.component";
@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss']
})
export class ManagementComponent implements OnInit {

  locations: LocationModel[] = [];
  washTypes: WashType[] = [];
  selectedLocation: LocationModel | undefined;
  selectedWashType: WashType | undefined;
  actionInProgress = false;
  showingLocationForm = false;
  showingWashTypeForm = false;

  constructor(private locationService: LocationService,
              private washTypeService: WashTypeService,
              private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getCompanyLocations();
  }

  getCompanyLocations() {
    this.locationService.getCompanyLocations()
      .subscribe((locations) => this.locations = locations ?? []);
  }

  getLocationWashTypes() {
    if (this.selectedLocation?.id) {
      this.washTypeService.getLocationWashTypes(this.selectedLocation.id)
        .subscribe((washTypes) => this.washTypes = washTypes ?? []);
    }
  }

  getSelectedLocation(item: LocationModel) {
    this.selectedLocation = item;
    this.showingWashTypeForm = false;
    this.showingLocationForm = true;
    this.getLocationWashTypes();
  }

  getSelectedWashType(item: WashType) {
    this.selectedWashType = item;
    this.showingLocationForm = false;
    this.showingWashTypeForm = true;
  }

  newLocation() {
    this.selectedLocation = undefined;
    this.showingWashTypeForm = false;
    this.showingLocationForm = true;
  }

  deleteLocation() {
    this.actionInProgress = true;
    if (!this.selectedLocation) {
      this.dialog.open(ErrorAlertComponent,
        { data: { message: 'Vælg en lokation at slette' },
        });
      this.actionInProgress = false;
      return;
    }
    const dialogRef = this.dialog.open(ConfirmationAlertComponent,
      { data: { message: `Slette lokationen ${this.selectedLocation.name}?` },
      });
    dialogRef.afterClosed().subscribe(result => {
      if (result && this.selectedLocation?.id) {
        this.locationService.deleteLocation(this.selectedLocation.id).subscribe(success => {
          if (success) {
            this.locations = this.locations.filter(location => location.id !== this.selectedLocation?.id);
            this.washTypes = [];
            this.selectedLocation = undefined;
            this.showingLocationForm = false;
          } else {
            this.dialog.open(ErrorAlertComponent,
              { data: { message: 'Noget gik galt' },
              });
          }
        }, error => {
          this.dialog.open(ErrorAlertComponent,
            { data: { message: error.error.message },
            });
        });
      }
      this.actionInProgress = false;
    });
  }

  newWashType() {
    this.selectedWashType = undefined;
    this.showingLocationForm = false;
    this.showingWashTypeForm = true;
  }

  deleteWashType() {
    this.actionInProgress = true;
    if (!this.selectedWashType) {
      this.dialog.open(ErrorAlertComponent,
        { data: { message: 'Vælg en vasketype at slette' },
        });
      this.actionInProgress = false;
      return;
    }
    const dialogRef = this.dialog.open(ConfirmationAlertComponent,
      { data: { message: `Slette vasketypen ${this.selectedWashType.name}?` },
      });
    dialogRef.afterClosed().subscribe(result => {
      if (result && this.selectedWashType?.id) {
        this.washTypeService.deleteWashType(this.selectedWashType.id).subscribe(success => {
          if (success) {
            this.washTypes = this.washTypes.filter(washType => washType.id !== this.selectedWashType?.id);
            this.getLocationWashTypes();
            this.selectedWashType = undefined;
            this.showingWashTypeForm = false;
            this.showingLocationForm = true;
          } else {
            this.dialog.open(ErrorAlertComponent,
              { data: { message: 'Noget gik galt' },
              });
          }
        }, error => {
          this.dialog.open(ErrorAlertComponent,
            { data: { message: error.error.message },
            });
        });
      }
      this.actionInProgress = false;
    });
  }

  saveWashType(washType: WashType) {
    if (this.selectedWashType) {
      this.updateWashType(washType);
    } else {
      this.createWashType(washType)
    }
  }

  saveLocation(location: LocationModel) {
    if (this.selectedLocation) {
      this.updateLocation(location);
    } else {
      this.createLocation(location);
    }
  }

  updateLocation(location: LocationModel) {
    this.actionInProgress = true;
    this.locationService.updateLocation(location)
      .subscribe(updatedLocation => {
        const indexToUpdate = this.locations.findIndex(location => location.id === updatedLocation.id);
        this.locations[indexToUpdate] = updatedLocation;
        this.getSelectedLocation(updatedLocation);
        this.actionInProgress = false;
      }, error => {
        this.dialog.open(ErrorAlertComponent,
          { data: { message: error.error.message },
          });
        this.actionInProgress = false;
      });
  }

  createLocation(location: LocationModel) {
    this.actionInProgress = true;
    this.locationService.createLocation(location)
      .subscribe(createdLocation => {
        this.locations.push(createdLocation)
        this.getSelectedLocation(createdLocation);
        this.selectedWashType = undefined;
        this.actionInProgress = false;
      }, error => {
        this.dialog.open(ErrorAlertComponent,
          { data: { message: error.error.message },
          });
        this.actionInProgress = false;
      });
  }

  updateWashType(washType: WashType) {
    this.actionInProgress = true;
    this.washTypeService.updateWashType(washType)
      .subscribe(updatedWashType => {
        const washTypesIndex = this.washTypes.findIndex(washType => washType.id === updatedWashType.id);
        this.washTypes[washTypesIndex] = updatedWashType;
        this.getLocationWashTypes();
        this.getSelectedWashType(updatedWashType);
        this.actionInProgress = false;
      }, error => {
        this.dialog.open(ErrorAlertComponent,
          { data: { message: error.error.message },
          });
        this.actionInProgress = false;
      });
  }

  createWashType(washType: WashType) {
    this.actionInProgress = true;
    this.washTypeService.createWashType(washType)
      .subscribe(createdWashType => {
        this.washTypes.push(createdWashType);
        this.getLocationWashTypes();
        this.getSelectedWashType(createdWashType);
        this.actionInProgress = false;
      }, error => {
        this.dialog.open(ErrorAlertComponent,
          { data: { message: error.error.message },
          });
        this.actionInProgress = false;
      })
  }
}
