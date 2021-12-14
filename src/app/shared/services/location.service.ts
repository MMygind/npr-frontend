import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {LocationModel} from "../models/location.model";

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  private locationUrl = environment.backendUrl + 'locations';

  constructor(private http: HttpClient) {}

  // maybe delete
  getAllLocations(): Observable<LocationModel[]> {
    return this.http.get<LocationModel[]>(this.locationUrl);
  }

  getCompanyLocations(): Observable<LocationModel[]> {
    return this.http.get<LocationModel[]>(this.locationUrl + '/thisCompany');
  }

  getLocation(id: number): Observable<LocationModel> {
    return this.http.get<LocationModel>(this.locationUrl + `/${id}`);
  }

  createLocation(location: LocationModel): Observable<LocationModel> {
    return this.http.post<LocationModel>(this.locationUrl, location);
  }

  updateLocation(location: LocationModel): Observable<LocationModel> {
    return this.http.put<LocationModel>(this.locationUrl + `/${location.id}`, location);
  }

  deleteLocation(id: number): Observable<boolean> {
    return this.http.delete<boolean>(this.locationUrl + `/${id}`);
  }


}
