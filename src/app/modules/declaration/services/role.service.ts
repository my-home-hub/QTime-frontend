import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  // JWT decoder is casted to a variable to allow mocking
  jwtDecode = jwtDecode;

  constructor(private cookieService: CookieService) {}

  /**
   * @description gets a cookie by the name `token`
   * This cookie contains a JWT with roles defined
   * Decode the JWT and get the roles, this is returned as string
   * Parse string to array and return the result
   */
  getRoles(): string[] {
    if (this.cookieService.check('token')) {
      try {
        const roleString = this.jwtDecode(this.cookieService.get('token')).role;
        return roleString.split(' ');
      } catch (Error) {}
    }
    return [];
  }

  getEmployeeName(): string {
    if (this.cookieService.check('token')) {
      try {
        return this.jwtDecode(this.cookieService.get('token')).sub;
      } catch (Error) {}
    }
    return '';
  }
}
