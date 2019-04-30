import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StatisticsRoutingModule } from './statistics-routing.module';

@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    StatisticsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
  ]
})
export class StatisticsModule { }
