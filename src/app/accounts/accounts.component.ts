import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

import { AccountData } from '../shared/interfaces/common.interface';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit, AfterViewInit {

  dataSource: MatTableDataSource<AccountData> = new MatTableDataSource<AccountData>(
  [
    {
      id: 1,
      name: 'Main account',
      category: 'personal',
      tag: 'regular',
      balance: 1.23,
      availableBalance: 1.00
    },
    {
      id: 2,
      name: 'Payslip account',
      category: 'payslip',
      tag: 'work',
      balance: 1.14,
      availableBalance: 1.02
    },
    {
      id: 3,
      name: 'Investment account',
      category: 'stockmarket',
      tag: 'risky',
      balance: 1.213,
      availableBalance: 1.0
    },
    {
      id: 4,
      name: 'Main account',
      category: 'personal',
      tag: 'regular',
      balance: 1.23,
      availableBalance: 0.9
    },
    {
      id: 5,
      name: 'Payslip account',
      category: 'payslip',
      tag: 'work',
      balance: 1.14,
      availableBalance: 1.02
    },
    {
      id: 6,
      name: 'Investment account',
      category: 'stockmarket',
      tag: 'risky',
      balance: 1.21,
      availableBalance: 1.01
    },
    {
      id: 7,
      name: 'Main account',
      category: 'personal',
      tag: 'regular',
      balance: 0.81,
      availableBalance: 0.81
    },
    {
      id: 8,
      name: 'Payslip account',
      category: 'payslip',
      tag: 'work',
      balance: 0.71,
      availableBalance: 0.5
    },
    {
      id: 9,
      name: 'Investment account',
      category: 'stockmarket',
      tag: 'risky',
      balance: 0.99,
      availableBalance: 0.55
    },
    {
      id: 10,
      name: 'Main account',
      category: 'personal',
      tag: 'regular',
      balance: 1.23,
      availableBalance: 1.11
    },
    {
      id: 11,
      name: 'Payslip account',
      category: 'payslip',
      tag: 'work',
      balance: 1.3,
      availableBalance: 1.02
    },
    {
      id: 12,
      name: 'Investment account',
      category: 'stockmarket',
      tag: 'risky',
      balance: 0.213,
      availableBalance: 0.1
    },
    {
      id: 13,
      name: 'Main account',
      category: 'personal',
      tag: 'regular',
      balance: 0.12,
      availableBalance: 0.01
    },
    {
      id: 14,
      name: 'Payslip account',
      category: 'payslip',
      tag: 'work',
      balance: 1.7,
      availableBalance: 1.6
    },
    {
      id: 15,
      name: 'Investment account',
      category: 'stockmarket',
      tag: 'risky',
      balance: 1.11,
      availableBalance: 1.07
    }
  ]
  );

  displayedColumns = ['accountName', 'category', 'tag', 'balance', 'availableBalance'];
  pageSizeOptions = [5, 10, 25, 100];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
