import { Injectable } from '@angular/core';

import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';

import { AccountData } from '../accounts/accounts.interface';

const BITCOIN_RATE_CHANNEL = 'bitcoinRate';
const ACCOUNTS_BALANCE_CHANNEL = 'accountsBalance';

@Injectable({
  providedIn: 'root'
})
export class DataProviderService {
  private bitcoinExchangeRate$: Observable<number>;
  private accountBalance$: Observable<AccountData[]>;

  constructor(
    private socket: Socket
  ) { }

  getBitcoinExchangeRate(): Observable<number> {
    if (!this.bitcoinExchangeRate$) {
      this.bitcoinExchangeRate$ = this.connectToChannel(BITCOIN_RATE_CHANNEL);
    }

    return this.bitcoinExchangeRate$;
  }

  getAccountBalance(): Observable<AccountData[]> {
    if (!this.accountBalance$) {
      this.accountBalance$ = this.connectToChannel(ACCOUNTS_BALANCE_CHANNEL);
    }

    return this.accountBalance$;
  }

  private connectToChannel(channel: string): Observable<any> {
    return this.socket.fromEvent(channel);
  }
}
