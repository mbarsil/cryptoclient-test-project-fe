import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';

import { AccountData } from './accounts.interface';
import { DataProviderService } from '../services/data-provider.service';
import { AccountsService } from './accounts.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit, AfterViewInit {
  bitcoinExchangeRate = 0;
  dataSource: MatTableDataSource<AccountData> = new MatTableDataSource<AccountData>([]);
  displayedColumns = ['accountName', 'category', 'tag', 'balance', 'availableBalance'];
  pageSizeOptions = [15, 25, 50, 100];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private dataProviderService: DataProviderService,
    private accountsService: AccountsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initBitcoinRateSubscription();
    this.initAccountsBalanceSubscription();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  navigateToAccountDetail(row: AccountData) {
    this.accountsService.selectedAccount = row;

    this.router.navigateByUrl(`accounts/${row.id}`);
  }

  private generateDollarExchange(): void {
    const newData = this.dataSource.data.map((rowData: AccountData) => {
      return this.accountsService.generateDollarExchange(rowData, this.bitcoinExchangeRate);
    });

    this.dataSource.data = newData;
  }

  private initBitcoinRateSubscription(): void {
    this.dataProviderService.getBitcoinExchangeRateChannel().subscribe((bitcoinRate: number) => {
      this.bitcoinExchangeRate = bitcoinRate;

      this.generateDollarExchange();
    });
  }

  private initAccountsBalanceSubscription(): void {
    this.dataProviderService.getAccountBalanceChannel().subscribe((accounts: AccountData[]) => {
      this.dataSource.data = accounts.map((account: AccountData, index: number) => {
        return this.accountsService.getUpdatedAccountStatus(
          account,
          this.dataSource.data[index]?.balance
        );
      });

      this.generateDollarExchange();
    });
  }
}
