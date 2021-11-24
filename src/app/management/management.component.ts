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
  locationWashTypes: WashType[] = [];
  washTypes: WashType[] = [];
  selectedLocation: LocationModel | undefined;
  selectedWashType: WashType | undefined;
  selectedLocationWashTypeIndex = -1;
  selectedWashTypeIndex = -1;
  actionInProgress = false;
  locationDetails = false;
  washTypeDetails = false;

  constructor(private locationService: LocationService,
              private washTypeService: WashTypeService,
              private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getAllLocations();
    this.getAllWashTypes();
  }

  getAllLocations() {
    this.locationService.getAllLocations().subscribe(locations => this.locations = locations);
  }

  getAllWashTypes() {
    this.washTypeService.getAllWashTypes().subscribe(washTypes => this.washTypes = washTypes);
  }

  getSelectedLocation(item: LocationModel) {
    this.selectedLocation = item;
    this.locationWashTypes = item.washTypes;
    this.washTypeDetails = false;
    this.locationDetails = true;
  }

  getSelectedLocationWashType(item: WashType, index: number) {
    this.selectedWashType = item;
    this.selectedLocationWashTypeIndex = index;
    this.selectedWashTypeIndex = -1;
    this.locationDetails = false;
    this.washTypeDetails = true;
  }

  getSelectedWashType(item: WashType, index: number) {
    this.selectedWashType = item;
    this.selectedWashTypeIndex = index;
    this.selectedLocationWashTypeIndex = -1;
    this.locationDetails = false;
    this.washTypeDetails = true;
  }

  addWashTypeToLocation() {
    if (this.selectedWashType && this.selectedLocation) {
      const copiedLocation = this.copyLocation(this.selectedLocation);
      copiedLocation.washTypes.push(this.selectedWashType);
      this.updateLocation(copiedLocation);
    }
  }

  removeWashTypeFromLocation() {
    if (this.selectedWashType && this.selectedLocation) {
      const copiedLocation = this.copyLocation(this.selectedLocation);
      copiedLocation.washTypes = copiedLocation.washTypes
        .filter(washType => washType.id !== this.selectedWashType?.id);
      this.updateLocation(copiedLocation);
    }
  }

  updateLocation(location: LocationModel) {
    this.actionInProgress = true;
    this.locationService.updateLocation(location)
      .subscribe(updatedLocation => {
        const indexToUpdate = this.locations.findIndex(location => location.id === updatedLocation.id);
        this.locations[indexToUpdate] = updatedLocation;
        this.selectedLocation = updatedLocation;
        this.locationWashTypes = updatedLocation.washTypes;
        this.actionInProgress = false;
      }, error => {
        this.dialog.open(ErrorAlertComponent,
          { data: { message: error.error.message },
          });
        this.actionInProgress = false;
      });
  }

  copyLocation(location: LocationModel): LocationModel {
    const alteredWashTypes: WashType[] = [];
    location.washTypes.forEach(washType => alteredWashTypes.push(washType));
    const copy: LocationModel = {
      id: location.id,
      name: location.name,
      washTypes: alteredWashTypes,
      company: location.company,
      address: location.address,
      city: location.city,
      postalCode: location.postalCode,
      latitude: location.latitude,
      longitude: location.longitude
    }
    return copy;
  }

  newLocation() {
    this.selectedLocation = undefined;
    this.washTypeDetails = false;
    this.locationDetails = true;
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
            this.locationWashTypes = [];
            this.selectedLocation = undefined;
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
    this.selectedWashTypeIndex = -1;
    this.selectedLocationWashTypeIndex = -1;
    this.locationDetails = false;
    this.washTypeDetails = true;
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
            this.locations.forEach(location => {
              location.washTypes = location.washTypes
                .filter(washType => washType.id !== this.selectedWashType?.id);
            })
            if (this.selectedLocation) {
              this.locationWashTypes = this.selectedLocation.washTypes;
            }
            this.selectedWashType = undefined;
            this.selectedLocationWashTypeIndex = -1;
            this.selectedWashTypeIndex = -1;
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
}
