import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'TimeSheet';

  currentRoute: string = '';
  scrolledDown = false;

  scrollCallback: () => void = () => {
    this.scrolledDown = window.scrollY > window.innerHeight / 2;
  };

  scrollBoundCallBack: () => void;

  constructor(private router: Router, private activeRoute: ActivatedRoute) {
    this.scrollBoundCallBack = this.scrollCallback.bind(this);
  }

  ngOnInit(): void {
    window.addEventListener('scroll', this.scrollBoundCallBack);

    this.currentRoute = this.activeRoute.snapshot.url.join('');

    this.router.events
      .pipe(filter((val): val is NavigationEnd => val instanceof NavigationEnd))
      .subscribe({
        next: (navEnd) => (this.currentRoute = navEnd.url),
      });
  }

  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.scrollBoundCallBack);
  }

  OnHomePage(): boolean {
    return this.currentRoute === '/';
  }
}
