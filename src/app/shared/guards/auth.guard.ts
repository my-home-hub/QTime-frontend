import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  // JWT decoder is casted to a variable to allow mocking
  jwtDecode = jwt_decode;

  constructor(private router: Router,
              private cookieService: CookieService) {}

  /**
   * @description Guard to check whether a user has the correct privileges to access
   * a page. The user needs a cookie named `token` which should contain a valid JWT.
   * This JWT contains the user roles, which also need to be valid for the current page.
   *
   * Firstly the cookie existence is checked. If it exists it's casted to a variable.
   * Secondly a decoder is used to get the roles from the JWT. This may throw an Exception.
   * If the JWT is incorrect, the cookie is deleted in the catch statement.
   * Finally the roles are formatted and checked against the required page roles.
   *
   * @param route - the current page route
   * @param state - the current page snapshot
   * @return boolean - whether a navigation may complete
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!this.cookieService.check('token')) {
      this.router.navigate(['/']);
      return false;
    }
    const token = this.cookieService.get('token');

    try {
      const role_string = this.jwtDecode(token).role;
      const roles = role_string.split(' ');
      return roles && route.data.roles.some(x => roles.indexOf(x) >= 0);
    } catch (Error) {
      this.cookieService.delete('token');
      this.router.navigate(['/']);
      return false;
    }
  }
}
