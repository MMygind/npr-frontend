import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../shared/helpers/auth.guard';
import Role from '../shared/helpers/role.enum';
import { TransactionComponent } from './transaction.component';

const routes: Routes = [{ path: '', component: TransactionComponent }, { path: '/:searchString', component: TransactionComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionRoutingModule { }
