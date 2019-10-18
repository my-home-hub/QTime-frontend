import { inject, TestBed } from '@angular/core/testing';
import { CookieService } from 'ngx-cookie-service';
import { AuthGuard } from './auth.guard';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Role } from '../models/role';

describe('AuthGuard', () => {
  let cookieService: CookieService;

  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [AuthGuard, CookieService, { provide: RouterStateSnapshot }],
    }),
  );

  it('should be created', () => {
    const authGuard: AuthGuard = TestBed.get(AuthGuard);
    expect(authGuard).toBeTruthy();
  });

  it('should return false if cookie `token` does not exist', inject([AuthGuard], () => {
    cookieService = TestBed.get(CookieService);
    const authGuard: AuthGuard = TestBed.get(AuthGuard);

    if (cookieService.check('token')) {
      cookieService.delete('token');
    }
    expect(authGuard.canActivate(new ActivatedRouteSnapshot())).toBe(false);
    expect(cookieService.check('token')).toBe(false);
  }));

  it('should return false if the JWT is incorrect', inject([AuthGuard], () => {
    cookieService = TestBed.get(CookieService);
    const authGuard: AuthGuard = TestBed.get(AuthGuard);

    cookieService.set('token', 'IncorrectJWT');
    expect(authGuard.canActivate(new ActivatedRouteSnapshot())).toBe(false);
    expect(cookieService.check('token')).toBe(false);
  }));

  it('should return false if user does not have the correct role', inject([AuthGuard], () => {
    cookieService = TestBed.get(CookieService);
    const authGuard: AuthGuard = TestBed.get(AuthGuard);

    cookieService.set('token', 'CorrectJWTWithIncorrectRole');
    spyOn(authGuard, 'jwtDecode').and.returnValue({ role: 'ROLE_EMPLOYEE' });

    const activatedRouteSnapshot = new ActivatedRouteSnapshot();
    activatedRouteSnapshot.data = { roles: [Role.Admin] };

    expect(authGuard.canActivate(activatedRouteSnapshot)).toBe(false);
    expect(cookieService.check('token')).toBe(true);
  }));

  it('should return true if the cookie `token` contains a valid JWT and the user has the correct role', inject([AuthGuard], () => {
    cookieService = TestBed.get(CookieService);
    const authGuard: AuthGuard = TestBed.get(AuthGuard);

    cookieService.set('token', 'CorrectJWTWithCorrectRole');
    spyOn(authGuard, 'jwtDecode').and.returnValue({ role: 'ROLE_EMPLOYEE ROLE_ADMIN' });

    const activatedRouteSnapshot = new ActivatedRouteSnapshot();
    activatedRouteSnapshot.data = { roles: [Role.Admin] };

    expect(authGuard.canActivate(activatedRouteSnapshot)).toBe(true);
    expect(cookieService.check('token')).toBe(true);
  }));
});
