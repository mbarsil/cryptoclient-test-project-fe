import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { ACCOUNT_DETAIL_CHANNEL, DataProviderService } from '../../services/data-provider.service';
import { AccountData, Transaction } from '../accounts.interface';
import { AccountsService } from '../accounts.service';

@Component({
  selector: 'app-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.scss']
})
export class AccountDetailComponent  implements OnInit, OnDestroy, AfterViewInit {
  accountData: AccountData;

  bitcoinExchangeRate = 0;
  dataSource: MatTableDataSource<Transaction> = new MatTableDataSource<Transaction>([]);
  displayedColumns = ['confirmedDate', 'orderId', 'type', 'credit', 'balance'];
  pageSizeOptions = [15, 25, 50, 100];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private activatedRoute: ActivatedRoute,
    private dataProviderService: DataProviderService,
    private accountsService: AccountsService
  ) { }

  async ngOnInit(): Promise<void> {
    await this.setAccountData();
    this.initBitcoinRateSubscription();
    this.initAccountDataSubscription();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy(): void {
    this.dataProviderService.disconnectFromChannel(ACCOUNT_DETAIL_CHANNEL);
  }

  initAccountDataSubscription(): void {
    this.dataProviderService
      .getAccountByIdChannel(this.accountData?.id)
      .subscribe((accountData: AccountData) => {
        this.accountData = accountData;
        this.generateDollarExchange();
    });
  }

  async setAccountData(): Promise<void> {
    if (this.accountsService.selectedAccount) {
      this.accountData = this.accountsService.selectedAccount;
    } else {
      this.accountData = await this.dataProviderService.getAccountById<AccountData>(this.activatedRoute.snapshot.params.id);

      this.dataSource.data = this.accountData.transactions;
    }
  }

  private initBitcoinRateSubscription(): void {
    this.dataProviderService.getBitcoinExchangeRateChannel().subscribe((bitcoinRate: number) => {
      this.bitcoinExchangeRate = bitcoinRate;

      this.generateDollarExchange();
    });
  }

  private generateDollarExchange(): void {
    this.dataSource.data = this.accountsService
      .generateDollarExchange(
        this.accountData,
        this.bitcoinExchangeRate
      ).transactions;
  }
}
