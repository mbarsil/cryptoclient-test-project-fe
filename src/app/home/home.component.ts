import { Component, OnInit } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';

import { filter } from 'rxjs/operators';

import { DataProviderService } from '../services/data-provider.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  bitcoinExchangeRate: number;
  routeTitle: string;
  breadcrumbs = 'Home';

  constructor(
    private router: Router,
    private dataProviderService: DataProviderService
  ) {
    this.initRouteParamsSubscription();
  }

  ngOnInit(): void {
    this.initRouteParamsSubscription();
    this.initBitcoinRateSubscription();
  }

  private initRouteParamsSubscription(): void {
    this.router.events
      .pipe(filter(event => event instanceof ActivationEnd))
      .subscribe((event: ActivationEnd) => {
        if (event.snapshot.data.title) {
          this.setBreadcrumbs(event.snapshot.data.title);
        }
      });
  }

  private initBitcoinRateSubscription(): void {
    this.dataProviderService.getBitcoinExchangeRate().subscribe((bitcoinRate: number) => {
      this.bitcoinExchangeRate = bitcoinRate;
    });
  }

  private setBreadcrumbs(urlSegment: string): void {
    this.breadcrumbs += ' / ' + urlSegment;
  }
}
