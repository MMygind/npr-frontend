import { Component, OnInit } from '@angular/core';
import { NavigationElement } from "./navigation-element";
import { Router } from "@angular/router";
import { Location } from "@angular/common";
import { AuthenticationService } from '../shared/services/authentication.service';
import { User } from '../shared/models/user';
import Role from '../shared/helpers/role.enum';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit {

  elements: NavigationElement[] = [
    { path: '/management', name: 'Administration' },
    { path: '/customers', name: 'Kunder' },
    { path: '/transactions', name: 'Transaktioner' }
  ];
  activeLink: string | undefined;
  user: User | null | undefined;

  constructor(
    private location: Location,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.user.subscribe(user => this.user = user);
  }

  ngOnInit(): void {
    this.router.events.subscribe(() => {
      this.activeLink = this.location.path();
    });

  }

  isAdmin() {
    return this.user && this.user.role === Role.Admin;
  }

  logout() {
    this.authenticationService.logout();
  }
}
