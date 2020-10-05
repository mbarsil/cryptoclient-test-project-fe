import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';

import { AccountData } from '../accounts/accounts.interface';

import { environment } from '../../environments/environment';

const BITCOIN_RATE_CHANNEL = 'bitcoinRate';
const ACCOUNTS_BALANCE_CHANNEL = 'accountsBalance';
export const ACCOUNT_DETAIL_CHANNEL = 'accountDetail';
export const ACCOUNT_DETAIL_STOP_CHANNEL = 'accountDetailStop';

@Injectable({
  providedIn: 'root'
})
export class DataProviderService {
  private bitcoinExchangeRate$: Observable<number>;
  private accountBalance$: Observable<AccountData[]>;
  private accountData$: Observable<AccountData>;

  constructor(
    private socket: Socket,
    private http: HttpClient
  ) { }

  getBitcoinExchangeRateChannel(): Observable<number> {
    if (!this.bitcoinExchangeRate$) {
      this.bitcoinExchangeRate$ = this.connectToChannel(BITCOIN_RATE_CHANNEL);
    }

    return this.bitcoinExchangeRate$;
  }

  getAccountBalanceChannel(): Observable<AccountData[]> {
    if (!this.accountBalance$) {
      this.accountBalance$ = this.connectToChannel(ACCOUNTS_BALANCE_CHANNEL);
    }

    return this.accountBalance$;
  }

  getAccountByIdChannel(id: number): Observable<AccountData> {
    if (!this.accountData$) {
      this.accountData$ = this.connectToChannel(ACCOUNT_DETAIL_CHANNEL);

      this.socket.emit(ACCOUNT_DETAIL_CHANNEL, id);
    }

    return this.accountData$;
  }

  async getAccountById<T>(id: number): Promise<T> {
    try {
      return await this.http.get<T>(`${environment.wsConfig.url}/accounts/${id}`).toPromise();
    } catch (errorResp) {
      throw errorResp;
    }
  }

  disconnectFromChannel(channelName: string) {
    this.socket.removeAllListeners(channelName);
    this.socket.emit(ACCOUNT_DETAIL_STOP_CHANNEL);
  }

  private connectToChannel(channel: string): Observable<any> {
    return this.socket.fromEvent(channel);
  }
}
