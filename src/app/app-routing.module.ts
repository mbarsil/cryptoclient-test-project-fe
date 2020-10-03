import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountsComponent } from './accounts/accounts.component';
import { AccountDetailComponent } from './accounts/account-detail/account-detail.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: { title: 'Accounts' },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'accounts',
        data: { title: 'Accounts' }
      },
      {
        path: 'accounts',
        component: AccountsComponent,
        data: { title: 'Accounts' }
      },
      {
        path: 'accounts/:id',
        component: AccountDetailComponent,
        data: { title: 'Details' }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
