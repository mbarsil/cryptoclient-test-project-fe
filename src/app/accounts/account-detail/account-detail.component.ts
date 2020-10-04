import { Component, OnDestroy, OnInit } from '@angular/core';

import { ACCOUNT_DETAIL_CHANNEL, DataProviderService } from '../../services/data-provider.service';
import { AccountData } from '../accounts.interface';
import { AccountsService } from '../accounts.service';

@Component({
  selector: 'app-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.scss']
})
export class AccountDetailComponent  implements OnInit, OnDestroy {
  accountData: AccountData;

  constructor(
    private dataProviderService: DataProviderService,
    private accountsService: AccountsService
  ) { }

  ngOnInit(): void {
    this.setAccountData();
    this.initAccountDataSubscription();
  }

  ngOnDestroy(): void {
    this.dataProviderService.disconnectFromChannel(ACCOUNT_DETAIL_CHANNEL);
  }

  setAccountData(): void {
    this.accountData = this.accountsService.selectedAccount;
  }

  initAccountDataSubscription(): void {
    this.dataProviderService
      .getAccountById(this.accountData?.id)
      .subscribe((accountData: AccountData) => {
        this.accountData = accountData;
        // this.generateDollarExchange();
    });
  }
}
