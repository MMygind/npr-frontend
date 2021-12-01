import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: 'customers', loadChildren: () => import('./customer/customer.module').then(m => m.CustomerModule) },
  { path: 'transactions', loadChildren: () => import('./transaction/transaction.module').then(m => m.TransactionModule) },
  { path: 'management', loadChildren: () => import('./management/management.module').then(m => m.ManagementModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
