import { inject, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { JwtInterceptor } from './jwt.interceptor';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { AuthenticationService } from '../../modules/authentication/services/authentication.service';

describe('Jwt Interceptor', () => {
  let authenticationService: AuthenticationService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthenticationService,
        CookieService,
        JwtInterceptor,
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
      ],
    });
    authenticationService = TestBed.get(AuthenticationService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    const interceptor: JwtInterceptor = TestBed.get(JwtInterceptor);
    expect(interceptor).toBeTruthy();
  });

  it('should not set the Authorization header if the token is null', inject([HttpClient], (http: HttpClient) => {
    spyOnProperty(authenticationService, 'currentToken').and.returnValue(null);

    http.get('/api').subscribe((res) => {
      expect(res).toBeTruthy();
    });

    const request = httpTestingController.expectOne('/api');
    expect(request.request.headers.has('Authorization')).toEqual(false);
    request.flush({ data: {} });
    httpTestingController.verify();
  }));

  it('should set the Authorization header if the token is not null', inject([HttpClient], (http: HttpClient) => {
    spyOnProperty(authenticationService, 'currentToken').and.returnValue('ValidJWT');
    authenticationService['dataSource'].next('ValidJWT');

    http.get('/api').subscribe((res) => {
      expect(res).toBeTruthy();
    });

    const request = httpTestingController.expectOne('/api');
    expect(request.request.headers.has('Authorization')).toEqual(true);
    expect(request.request.headers.get('Authorization')).toBe('ValidJWT');
    request.flush({ data: {} });
    httpTestingController.verify();
  }));
});
