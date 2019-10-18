import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MediaMatcher } from '@angular/cdk/layout';
import { AuthenticationService } from '../../../authentication/services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnDestroy {
  mobileQuery: MediaQueryList;
  toggled = false;
  accountToggle = false;

  private _mobileQueryListener: () => void;

  constructor(
    private router: Router,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private authenticationLibService: AuthenticationService,
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  toggleNavigation(): void {
    this.toggled = !this.toggled;
  }

  navigateToUrl(routerlink: string): void {
    if (this.toggled) {
      this.toggleNavigation();
    }
    this.router.navigate([routerlink]);
  }

  toggleAccountNavigation(): void {
    this.accountToggle = !this.accountToggle;
  }

  disableAccountNavigation(): void {
    this.accountToggle = false;
  }

  logOut(): void {
    this.authenticationLibService.logOut();
  }
}
