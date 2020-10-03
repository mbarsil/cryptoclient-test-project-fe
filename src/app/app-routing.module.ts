import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountsComponent } from './accounts/accounts.component';
import { AccountDetailComponent } from './accounts/account-detail/account-detail.component';

const routes: Routes = [
  {
    path: '',
    component: AccountsComponent
  },
  {
    path: 'accounts',
    component: AccountsComponent
  },
  {
    path: 'accounts/:id',
    component: AccountDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
