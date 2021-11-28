import { Component, OnInit } from '@angular/core';
import {NavigationElement} from "./navigation-element";
import {Router} from "@angular/router";
import {Location} from "@angular/common";

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit {

  elements: NavigationElement[] = [
    { path: '/management', name: 'Administration'},
    { path: '/customers', name: 'Kunder'},
    { path: '/transactions', name: 'Transaktioner'}
  ];
  activeLink: string | undefined;
  showNavBar = true;

  constructor(private location: Location, private router: Router) { }

  ngOnInit(): void {
    this.router.events.subscribe(() => {
      // don't show navigation bar on login screen
      if (this.location.path() == '/login') {
        this.showNavBar = false;
      } else {
        this.showNavBar = true;
        this.activeLink = this.location.path();
      }
    });
  }

}
