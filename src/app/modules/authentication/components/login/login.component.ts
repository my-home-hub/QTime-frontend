import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private authService: AuthenticationService, private formBuilder: FormBuilder) {}

  /**
   * @description Creates the form, used in the HTML
   * The form contains two fields, both with `required` Validators
   */
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  /**
   * @return `username` control
   */
  get username(): AbstractControl {
    return this.loginForm.get('username');
  }

  /**
   * @return `password` control
   */
  get password(): AbstractControl {
    return this.loginForm.get('password');
  }

  /**
   * @description Checks whether all loginForm fields all valid.
   * In this case it is required that all fields all filled in.
   * If the backend returns an error, an error is displayed in the HTML
   */
  login(): void {
    if (this.loginForm.invalid) {
      return;
    }

    this.authService.login(this.loginForm.value).subscribe(
      () => {},
      (error) => {
        if (error.status === 401 || error.status === 403) {
          this.loginForm.controls['password'].setErrors({ invalidCredentials: true });
        }
      },
    );
  }

  /**
   * @description Calls the auth service to logout an user
   */
  logout(): void {
    this.authService.logOut();
  }
}
