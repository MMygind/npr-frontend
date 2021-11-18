import { Component, OnInit } from '@angular/core';
import {LocationService} from "../shared/services/location.service";
import {WashTypeService} from "../shared/services/washtype.service";
import {LocationModel} from "../shared/models/location.model";
import {WashType} from "../shared/models/washtype.model";

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

  constructor(private locationService: LocationService,
              private washTypeService: WashTypeService) {}

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
    // this.selectedWashType = undefined;
  }

  getSelectedLocationWashType(item: WashType, index: number) {
    this.selectedWashType = item;
    this.selectedLocationWashTypeIndex = index;
    this.selectedWashTypeIndex = -1;
    // this.selectedLocation = undefined;
  }

  getSelectedWashType(item: WashType, index: number) {
    this.selectedWashType = item;
    this.selectedWashTypeIndex = index;
    this.selectedLocationWashTypeIndex = -1;
    // this.selectedLocation = undefined;
  }

}
