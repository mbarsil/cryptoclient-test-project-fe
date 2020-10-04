import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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
    private activatedRoute: ActivatedRoute,
    private dataProviderService: DataProviderService,
    private accountsService: AccountsService
  ) { }

  async ngOnInit(): Promise<void> {
    await this.setAccountData();
    this.initAccountDataSubscription();
  }

  ngOnDestroy(): void {
    this.dataProviderService.disconnectFromChannel(ACCOUNT_DETAIL_CHANNEL);
  }

  initAccountDataSubscription(): void {
    this.dataProviderService
      .getAccountByIdChannel(this.accountData?.id)
      .subscribe((accountData: AccountData) => {
        this.accountData = accountData;
        // this.generateDollarExchange();
    });
  }

  async setAccountData(): Promise<void> {
    if (this.accountsService.selectedAccount) {
      this.accountData = this.accountsService.selectedAccount;
    } else {
      this.accountData = await this.dataProviderService.getAccountById<AccountData>(this.activatedRoute.snapshot.params.id);
    }
  }
}
