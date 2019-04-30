import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MediaMatcher } from '@angular/cdk/layout';
import { AuthenticationService } from '../../../authentication/services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  mobileQuery: MediaQueryList;
  toggled = false;
  accountToggle = false;

  private _mobileQueryListener: () => void;

  constructor(private router: Router,
              changeDetectorRef: ChangeDetectorRef,
              media: MediaMatcher,
              private authenticationLibService: AuthenticationService) {
    this.mobileQuery = media.matchMedia('(max-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  toggleNavigation() {
    this.toggled = !this.toggled;
  }

  navigateToUrl(routerlink: string) {
    if (this.toggled) {
      this.toggleNavigation();
    }
    this.router.navigate([routerlink]);
  }

  toggleAccountNavigation() {
    this.accountToggle = !this.accountToggle;
  }

  disableAccountNavigation() {
    this.accountToggle = false;
  }

  logOut() {
    this.authenticationLibService.logOut();
  }
}
