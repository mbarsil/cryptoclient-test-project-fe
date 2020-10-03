import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivationEnd, Router, RouterEvent, UrlSegment } from '@angular/router';
import { AccountsService } from '../services/accounts.service';

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
    private accountsService: AccountsService
  ) {
    this.initRouteParamsSubscription();
  }

  ngOnInit(): void {
    this.bitcoinExchangeRate = this.accountsService.bitcoinExchangeRate;

    this.initRouteParamsSubscription();
  }

  private initRouteParamsSubscription(): void {
    this.router.events.subscribe((event: ActivationEnd) => {
      if (event.snapshot && event.snapshot.url.length) {
        this.routeTitle = event.snapshot.data.title;

        this.setBreadcrumbs(event.snapshot.url);
      }
    });
  }

  private setBreadcrumbs(urlSegments: UrlSegment[]): void {
    this.breadcrumbs = urlSegments.reduce((acc, curr) => {
      return acc + ' / ' + curr.path.charAt(0).toUpperCase() + curr.path.slice(1);
    }, 'Home');
  }
}
