import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/helpers/auth.guard';

const routes: Routes = [
  { path: '', redirectTo:'/transactions', pathMatch: 'full'},                   
  { path: 'customers', loadChildren: () => import('./customer/customer.module').then(m => m.CustomerModule), canActivate: [AuthGuard] },
  { path: 'transactions', loadChildren: () => import('./transaction/transaction.module').then(m => m.TransactionModule), canActivate: [AuthGuard] },
  { path: 'management', loadChildren: () => import('./management/management.module').then(m => m.ManagementModule), canActivate: [AuthGuard] },
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
