import { Injectable } from '@angular/core';

import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';

const BITCOIN_RATE_CHANNEL = 'bitcoinRate';

@Injectable({
  providedIn: 'root'
})
export class DataProviderService {
  private bitcoinExchangeRate$: Observable<number>;

  constructor(
    private socket: Socket
  ) { }

  connect(): void {
    this.socket.emit(BITCOIN_RATE_CHANNEL, {});
  }

  getBitcoinExchangeRate(): Observable<number> {
    if (!this.bitcoinExchangeRate$) {
      this.initBitcoinRateSubscription();
    }

    return this.bitcoinExchangeRate$;
  }

  initBitcoinRateSubscription(): void {
    this.bitcoinExchangeRate$ = this.socket.fromEvent(BITCOIN_RATE_CHANNEL);
  }
}
