import { Component } from '@angular/core';
import { User } from './shared/models/user';
import { AuthenticationService } from './shared/services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'npr-frontend';
  user: User | null | undefined;

  constructor(private authenticationService: AuthenticationService) {
    this.authenticationService.user.subscribe(user => this.user = user);
  }

  logout() {
    this.authenticationService.logout();
  }
}
