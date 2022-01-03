import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../shared/helpers/auth.guard';
import Role from '../shared/helpers/role.enum';
import { CustomerComponent } from './customer.component';

const routes: Routes = [
  {
    path: '',
    component: CustomerComponent,
    canActivate: [AuthGuard] 
  },
  { 
    path: '', 
    component: CustomerComponent 
  }, 
  { 
    path: '/:searchString', 
    component: CustomerComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
