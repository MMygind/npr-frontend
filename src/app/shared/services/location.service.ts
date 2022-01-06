import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {LocationModel} from "../models/location.model";

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  private locationUrl = environment.backendUrl + 'web/locations';

  constructor(private http: HttpClient) {}

  getCompanyLocations(): Observable<LocationModel[]> {
    return this.http.get<LocationModel[]>(this.locationUrl + '/thisCompany', { withCredentials: true });
  }

  createLocation(location: LocationModel): Observable<LocationModel> {
    return this.http.post<LocationModel>(this.locationUrl, location, { withCredentials: true });
  }

  updateLocation(location: LocationModel): Observable<LocationModel> {
    return this.http.put<LocationModel>(this.locationUrl + `/${location.id}`, location, { withCredentials: true });
  }

  deleteLocation(id: number): Observable<boolean> {
    return this.http.delete<boolean>(this.locationUrl + `/${id}`, { withCredentials: true });
  }


}
