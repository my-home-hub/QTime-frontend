import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private dataSource: BehaviorSubject<string>;

  constructor(private http: HttpClient,
              private cookieService: CookieService) {
    this.dataSource = new BehaviorSubject<string>(this.cookieService.get('token'));
  }

  /**
   * @return `JWT` as string
   */
  public get currentToken(): string {
    return this.dataSource.value;
  }

  /**
   * @return `JWT` as observable
   */
  public get tokenSubscription(): Observable<string> {
    return this.dataSource.asObservable();
  }

  /**
   * @description Method for logging in the user
   * Subscribe is called from the component, therefor a mapping is used
   * to get the token and save it to the BehaviourSubject and cookie
   *
   * @return observable
   */
  login(credentials): Observable<any> {
    return this.http.post('/api/security/auth/login', credentials, { observe: 'response' })
      .pipe(map((res: any) => {
        const token = res.headers.get('Authorization');
        if (token) {
          this.cookieService.set('token', token);
          this.dataSource.next(token);
        }
      }));
  }

  /**
   * @description Logs the current user out by deleting
   * the cookie and setting the BehaviourSubject to null
   */
  logOut() {
    this.cookieService.delete('token');
    this.dataSource.next(null);
  }
}
