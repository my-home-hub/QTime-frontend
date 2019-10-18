import { fakeAsync, TestBed, tick } from '@angular/core/testing';

import { AuthenticationService } from './authentication.service';
import { CookieService } from 'ngx-cookie-service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { throwError } from 'rxjs';

describe('AuthenticationService', () => {
  let cookieService: CookieService;
  let authenticationLibService: AuthenticationService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CookieService],
    });
    authenticationLibService = TestBed.get(AuthenticationService);
    cookieService = TestBed.get(CookieService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    const service: AuthenticationService = TestBed.get(AuthenticationService);
    expect(service).toBeTruthy();
  });

  it('should not set a cookie or the behaviour subject if the login was incorrect', fakeAsync(() => {
    if (cookieService.check('token')) {
      cookieService.delete('token');
    }
    if (authenticationLibService !== null) {
      authenticationLibService['dataSource'].next(null);
    }

    authenticationLibService
      .login({ username: 'JohnDoe', password: 'password1234 ' })
      .subscribe(() => {}, () => throwError('Invalid credentials'));

    httpTestingController
      .expectOne((r) => r.method === 'POST' && r.url.endsWith('/api/security/auth/login'))
      .error(new ErrorEvent('Bad Request'));

    tick();
    expect(cookieService.check('token')).toBe(false);
    expect(authenticationLibService.currentToken).toBe(null);
  }));

  it('should set a cookie and the behaviour subject if login was correct', fakeAsync(() => {
    if (cookieService.check('token')) {
      cookieService.delete('token');
    }
    if (authenticationLibService !== null) {
      authenticationLibService['dataSource'].next(null);
    }

    const response = {};
    authenticationLibService.login({ username: 'JohnDoe', password: 'password1234 ' }).subscribe();

    const req = httpTestingController.expectOne((r) => r.method === 'POST' && r.url.endsWith('/api/security/auth/login'));
    req.flush(response, { headers: { Authorization: 'ValidJWT' }, status: 200, statusText: 'OK' });

    tick();
    expect(cookieService.get('token')).toBe('ValidJWT');
    expect(authenticationLibService.currentToken).toBe('ValidJWT');
  }));

  it('should logout the user', () => {
    cookieService.set('token', 'ValidJWT');
    authenticationLibService['dataSource'].next('ValidJWT');

    expect(cookieService.check('token')).toBe(true);
    expect(authenticationLibService.currentToken).toBe('ValidJWT');

    authenticationLibService.logOut();
    expect(cookieService.check('token')).toBe(false);
    expect(authenticationLibService.currentToken).toBe(null);
  });
});
