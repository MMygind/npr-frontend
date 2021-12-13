import { Component } from '@angular/core';
import Role from './shared/helpers/role.enum';
import { User } from './shared/models/user';
import { AuthenticationService } from './shared/services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'npr-frontend';
}
