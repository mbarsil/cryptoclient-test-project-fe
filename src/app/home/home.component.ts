import { Component, OnInit } from '@angular/core';
import { ActivationEnd, Router, UrlSegment } from '@angular/router';
import { DataProviderService } from '../services/data-provider.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  bitcoinExchangeRate: number;
  routeTitle: string;
  breadcrumbs: string;

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
    this.router.events.subscribe((event: ActivationEnd) => {
      if (event.snapshot && event.snapshot.url.length) {
        this.routeTitle = event.snapshot.data.title;

        this.setBreadcrumbs(event.snapshot.url);
      }
    });
  }

  private initBitcoinRateSubscription(): void {
    this.dataProviderService.getBitcoinExchangeRate().subscribe((bitcoinRate: number) => {
      this.bitcoinExchangeRate = bitcoinRate;
    });
  }

  private setBreadcrumbs(urlSegments: UrlSegment[]): void {
    this.breadcrumbs = urlSegments.reduce((acc, curr) => {
      return acc + ' / ' + curr.path.charAt(0).toUpperCase() + curr.path.slice(1);
    }, 'Home');
  }
}
