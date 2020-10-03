import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

import { AccountData } from './accounts.interface';
import { DataProviderService } from '../services/data-provider.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit, AfterViewInit {
  bitcoinExchangeRate = 0;
  dataSource: MatTableDataSource<AccountData> = new MatTableDataSource<AccountData>([]);
  displayedColumns = ['accountName', 'category', 'tag', 'balance', 'availableBalance'];
  pageSizeOptions = [5, 10, 25, 100];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private dataProviderService: DataProviderService
  ) { }

  ngOnInit(): void {
    this.initBitcoinRateSubscription();
    this.initAccountsBalanceSubscription();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  private generateDollarExchange(): void {
    const newData = this.dataSource.data.map((rowData: AccountData) => {
      return {
        ...rowData,
        dollarsBalance: rowData.balance * this.bitcoinExchangeRate,
        dollarsAvailableBalance: rowData.availableBalance * this.bitcoinExchangeRate,
      };
    });

    this.dataSource.data = newData;
  }

  private initBitcoinRateSubscription(): void {
    this.dataProviderService.getBitcoinExchangeRate().subscribe((bitcoinRate: number) => {
      this.bitcoinExchangeRate = bitcoinRate;

      this.generateDollarExchange();
    });
  }

  private initAccountsBalanceSubscription(): void {
    this.dataProviderService.getAccountBalance().subscribe((accounts: AccountData[]) => {
      this.dataSource.data = accounts.map((account: AccountData, index: number) => {
        return {
          ...account,
          increased: account.balance > this.dataSource.data[index]?.balance,
          decreased: account.balance < this.dataSource.data[index]?.balance
        };
      });

      this.generateDollarExchange();
    });
  }
}
