import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AuthenticationService } from './modules/authentication/services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  loggedIn = false;

  constructor(private cookieService: CookieService,
              private authService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.authService.tokenSubscription
      .subscribe(() => {
        this.loggedIn = this.cookieService.check('token');
      });
  }
}
