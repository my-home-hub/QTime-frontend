import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CookieService } from 'ngx-cookie-service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [HttpClientTestingModule, FormsModule, ReactiveFormsModule],
      providers: [CookieService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be invalid when form is empty', () => {
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('should test email field validity', () => {
    let errors: {};
    const username = component.loginForm.controls['username'];
    expect(username.valid).toBeFalsy();

    errors = username.errors || {};
    expect(errors['required']).toBeTruthy();

    username.setValue('JohnDoe');
    errors = username.errors || {};
    expect(errors['required']).toBeFalsy();
  });

  it('should test password field validity', () => {
    let errors: {};
    const password = component.loginForm.controls['password'];

    errors = password.errors || {};
    expect(errors['required']).toBeTruthy();

    password.setValue('password1234');
    errors = password.errors || {};
    expect(errors['required']).toBeFalsy();
  });

  it('should log the user in', () => {
    expect(component.loginForm.valid).toBeFalsy();
    component.loginForm.controls['username'].setValue('JohnDoe');
    component.loginForm.controls['password'].setValue('password1234');
    expect(component.loginForm.valid).toBeTruthy();

    expect(component.login).toBeTruthy();
  });
});
