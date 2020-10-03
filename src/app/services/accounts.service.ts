import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {
  private _bitcoinExchangeRate = 9789.2;

  get bitcoinExchangeRate(): number {
    return this._bitcoinExchangeRate;
  }

  set bitcoinExchangeRate(newRate: number) {
    this._bitcoinExchangeRate = newRate;
  }
}
