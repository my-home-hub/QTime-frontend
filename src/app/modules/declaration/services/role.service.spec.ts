import { TestBed } from '@angular/core/testing';

import { RoleService } from './role.service';
import { CookieService } from 'ngx-cookie-service';

describe('RoleService', () => {
  let cookieService: CookieService;
  let roleService: RoleService;

  beforeEach(() => {
    TestBed.configureTestingModule(
      {
        providers: [
          CookieService,
          RoleService
        ]
      });
    cookieService = TestBed.get(CookieService);
    roleService = TestBed.get(RoleService);
  });

  it('should be created', () => {
    const service: RoleService = TestBed.get(RoleService);
    expect(service).toBeTruthy();
  });

  it('should not get roles if the token does not exists', () => {
    if (cookieService.check('token')) {
      cookieService.delete('token');
    }
    expect(roleService.getRoles().length).toEqual(0);
  });

  it('should get all roles if the token is valid', () => {
    cookieService.set('token', 'CorrectJWTWithCorrectRole');
    spyOn(roleService, 'jwtDecode').and.returnValue({ role: 'ROLE_EMPLOYEE ROLE_ADMIN' });

    expect(roleService.getRoles()).toEqual(['ROLE_EMPLOYEE', 'ROLE_ADMIN']);
  });

  it('should not get roles if the token is invalid', () => {
    cookieService.set('token', 'InCorrectJWTWithCorrectRole');
    expect(roleService.getRoles().length).toEqual(0);
  });
});
