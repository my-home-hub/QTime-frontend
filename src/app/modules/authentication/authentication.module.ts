import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { LoginComponent } from './components/login/login.component';
import { AuthenticationService } from './services/authentication.service';

@NgModule({
  declarations: [LoginComponent],
  imports: [BrowserAnimationsModule, BrowserModule, FormsModule, HttpClientModule, ReactiveFormsModule],
  exports: [LoginComponent],
  providers: [AuthenticationService, CookieService],
})
export class AuthenticationModule {}
