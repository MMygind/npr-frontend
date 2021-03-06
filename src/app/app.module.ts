import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { appInitializer } from './shared/helpers/app.initializer';
import { AuthenticationService } from './shared/services/authentication.service';
import { ErrorInterceptor } from './shared/helpers/error.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from "@angular/material/tabs";
import { MatCardModule } from '@angular/material/card';
import {NoopAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatTabsModule,
    FormsModule,
    NoopAnimationsModule
  ],
  providers: [
    { provide: APP_INITIALIZER, useFactory: appInitializer, multi: true, deps: [AuthenticationService] },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
