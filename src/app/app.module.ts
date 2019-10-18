import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavigationModule } from './modules/navigation/navigation.module';
import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { DeclarationModule } from './modules/declaration/declaration.module';
import { JwtInterceptor } from './shared/interceptors/jwt.interceptor';
import { StatisticsModule } from './modules/statistics/statistics.module';
import { TimesheetModule } from './modules/timesheet/timesheet.module';

@NgModule({
  declarations: [AppComponent],
  imports: [AppRoutingModule, BrowserModule, AuthenticationModule, DeclarationModule, StatisticsModule, TimesheetModule, NavigationModule],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }],
  bootstrap: [AppComponent],
})
export class AppModule {}
