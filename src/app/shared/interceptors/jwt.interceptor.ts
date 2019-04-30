import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../../modules/authentication/services/authentication.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private authenticationService: AuthenticationService) {}

  /**
   * @description Intercepts all HTTP calls.
   * The calls gets cloned and a header is added.
   * This header contains the JWT.
   *
   * @return HttpRequest
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authenticationService.currentToken;
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `${token}`
        }
      });
    }
    return next.handle(request);
  }
}
