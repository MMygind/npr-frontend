import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {WashType} from "../models/washtype.model";

@Injectable({
  providedIn: 'root'
})
export class WashTypeService {

  private locationUrl = environment.backendUrl + 'washtypes';

  constructor(private http: HttpClient) {}

  getAllWashTypes(): Observable<WashType[]> {
    return this.http.get<WashType[]>(this.locationUrl);
  }

  getWashType(id: number): Observable<WashType> {
    return this.http.get<WashType>(this.locationUrl + `/${id}`);
  }

  createWashType(location: WashType): Observable<WashType> {
    return this.http.post<WashType>(this.locationUrl, location);
  }

  updateWashType(location: WashType): Observable<WashType> {
    return this.http.put<WashType>(this.locationUrl + `/${location.id}`, location);
  }

  deleteWashType(id: number) {
    this.http.delete<WashType>(this.locationUrl + `/${id}`);
  }
}
