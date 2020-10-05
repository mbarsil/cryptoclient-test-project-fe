import { Injectable } from '@angular/core';

import { AccountData, Transaction } from './accounts.interface';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {
  private _selectedAccount: AccountData;

  get selectedAccount(): AccountData {
    return this._selectedAccount;
  }

  set selectedAccount(accountData: AccountData) {
    this._selectedAccount = accountData;
  }

  generateDollarExchange(account: AccountData, bitcoinExchangeRate: number): AccountData {
    return {
      ...account,
      dollarsBalance: account.balance * bitcoinExchangeRate,
      dollarsAvailableBalance: account.availableBalance * bitcoinExchangeRate,
      transactions: account.transactions.map((transaction: Transaction) => {
        return {
          ...transaction,
          dollarsCredit: transaction.credit * bitcoinExchangeRate,
          dollarsBalance: transaction.balance * bitcoinExchangeRate
        };
      })
    };
  }

  getUpdatedAccountStatus(account: AccountData, previousBalance: number): AccountData {
    if (!previousBalance) { return account; }

    return {
      ...account,
      increased: account.balance > previousBalance,
      decreased: account.balance < previousBalance
    };
  }
}
