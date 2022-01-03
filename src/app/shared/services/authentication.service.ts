import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private userSubject: BehaviorSubject<User | null>;
  public user: Observable<User | null>;

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    this.userSubject = new BehaviorSubject<User | null>(null);
    this.user = this.userSubject.asObservable();
  }

  // used for getting current behavior subject without listening?
  public get userValue(): User | null {
    return this.userSubject.value;
  }

  // error handling? 401 on not allowed? what on wrong user/pass?
  login(email: string, password: string): Observable<User> {
    return this.http.post<User>(`${environment.backendUrl}web/authentication/log-in/`, { email, password })
      .pipe(map(user => {
        this.userSubject.next(user);
        return user;
      }));
  }

  logout() {
    this.http.post<any>(`${environment.backendUrl}web/authentication/log-out/`, {}, { withCredentials: true }).subscribe();
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }

  // attempt to login using refresh token
  refreshToken() {
    return this.http.post<User>(`${environment.backendUrl}web/authentication/refresh/`, {}, { withCredentials: true })
      .pipe(map((user) => {
        this.userSubject.next(user);
        console.log("User login by refresh token")
        return user;
      }));
  }
}