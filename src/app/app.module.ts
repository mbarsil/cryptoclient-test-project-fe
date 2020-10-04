import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SocketIoModule } from 'ngx-socket-io';

import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AccountsModule } from './accounts/accounts.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AccountsModule,

    SocketIoModule.forRoot(environment.wsConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
