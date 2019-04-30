import { inject, TestBed } from '@angular/core/testing';

import { AuthenticationLibService } from './login.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { JwtInterceptor } from './jwt.interceptor';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

describe('Jwt Interceptor', () => {
  let authenticationLibService: AuthenticationLibService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule(
      {
        imports: [
          HttpClientTestingModule
        ],
        providers: [
          AuthenticationLibService,
          CookieService,
          JwtInterceptor,
          { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        ]
      });
    authenticationLibService = TestBed.get(AuthenticationLibService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });


  it('should be created', () => {
    const interceptor: JwtInterceptor = TestBed.get(JwtInterceptor);
    expect(interceptor).toBeTruthy();
  });

  it('should not set the Authorization header if the token is null',
    inject([HttpClient], (http: HttpClient) => {
      spyOn(authenticationLibService, 'currentToken').and.returnValue(null);

      http.get('/api')
        .subscribe(res => {
          expect(res).toBeTruthy();
        });

      const request = httpTestingController.expectOne('/api');
      expect(request.request.headers.has('Authorization')).toEqual(false);
      request.flush({data: {}});
      httpTestingController.verify();
    }));

  it('should set the Authorization header if the token is not null',
    inject([HttpClient], (http: HttpClient) => {
      spyOnProperty(authenticationLibService, 'currentToken').and.returnValue('ValidJWT');
      authenticationLibService['dataSource'].next('ValidJWT');

      http.get('/api')
        .subscribe(res => {
          expect(res).toBeTruthy();
        });

      const request = httpTestingController.expectOne('/api');
      expect(request.request.headers.has('Authorization')).toEqual(true);
      expect(request.request.headers.get('Authorization')).toBe('ValidJWT');
      request.flush({data: {}});
      httpTestingController.verify();
    }));
});
