import { Component, OnInit } from '@angular/core';
import {LocationService} from "../shared/services/location.service";
import {WashTypeService} from "../shared/services/washtype.service";
import {LocationModel} from "../shared/models/location.model";
import {WashType} from "../shared/models/washtype.model";
import {MatSnackBar} from "@angular/material/snack-bar";
import {catchError} from "rxjs/operators";

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
  createLocation = false;
  createWashType = false;
  editLocation = false;
  editWashType = false;

  constructor(private locationService: LocationService,
              private washTypeService: WashTypeService,
              private snackBar: MatSnackBar) {}

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
  }

  getSelectedLocationWashType(item: WashType, index: number) {
    this.selectedWashType = item;
    this.selectedLocationWashTypeIndex = index;
    this.selectedWashTypeIndex = -1;
  }

  getSelectedWashType(item: WashType, index: number) {
    this.selectedWashType = item;
    this.selectedWashTypeIndex = index;
    this.selectedLocationWashTypeIndex = -1;
  }

  addWashTypeToLocation() {
    if (this.selectedWashType && this.selectedLocation) {
      const copiedLocation = this.copyLocation(this.selectedLocation);
      copiedLocation.washTypes.push(this.selectedWashType);
      this.updateLocation(copiedLocation);
    }
  }

  showSnackBarMessage(message: string) {
    this.snackBar.open(message, 'Ok', { duration: 10000 });
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
    this.locationService.updateLocation(location)
      .subscribe(updatedLocation => {
        const indexToUpdate = this.locations.findIndex(location => location.id === updatedLocation.id);
        this.locations[indexToUpdate] = updatedLocation;
        this.selectedLocation = updatedLocation;
        this.locationWashTypes = updatedLocation.washTypes;
      }, error => {
        this.showSnackBarMessage(error.error);
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

}
