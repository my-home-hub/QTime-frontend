import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TimesheetRoutingModule } from './timesheet-routing.module';
import { HourLoggingComponent } from './components/hour-logging/hour-logging.component';
import { TimesheetDashboardComponent } from './components/timesheet-dashboard/timesheet-dashboard.component';

@NgModule({
  declarations: [
    HourLoggingComponent,
    TimesheetDashboardComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    TimesheetRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
  ]
})
export class TimesheetModule { }
