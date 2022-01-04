import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {WashType} from "../models/washtype.model";

@Injectable({
  providedIn: 'root'
})
export class WashTypeService {

  private locationUrl = environment.backendUrl + 'web/washtypes';

  constructor(private http: HttpClient) {}

  getAllWashTypes(): Observable<WashType[]> {
    return this.http.get<WashType[]>(this.locationUrl, { withCredentials: true });
  }

  getLocationWashTypes(locationID: number): Observable<WashType[]> {
    return this.http.get<WashType[]>(this.locationUrl + `/byLocation/${locationID}`, { withCredentials: true });
  }

  getWashType(id: number): Observable<WashType> {
    return this.http.get<WashType>(this.locationUrl + `/${id}`, { withCredentials: true });
  }

  createWashType(location: WashType): Observable<WashType> {
    return this.http.post<WashType>(this.locationUrl, location, { withCredentials: true });
  }

  updateWashType(location: WashType): Observable<WashType> {
    return this.http.put<WashType>(this.locationUrl + `/${location.id}`, location, { withCredentials: true });
  }

  deleteWashType(id: number): Observable<boolean> {
    return this.http.delete<boolean>(this.locationUrl + `/${id}`, { withCredentials: true });
  }
}
