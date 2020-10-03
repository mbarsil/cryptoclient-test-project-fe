import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';

import { SocketIoModule } from 'ngx-socket-io';

import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { AccountsComponent } from './accounts/accounts.component';
import { AccountDetailComponent } from './accounts/account-detail/account-detail.component';
import { MatSortModule } from '@angular/material/sort';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    AccountsComponent,
    AccountDetailComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,

    SocketIoModule.forRoot(environment.wsConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
