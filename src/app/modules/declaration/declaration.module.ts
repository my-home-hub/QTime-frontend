import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeclarationRoutingModule } from './declaration-routing.module';
import { CreateComponent } from './components/create/create.component';
import { DeclarationDashboardComponent } from './components/declaration-dashboard/declaration-dashboard.component';
import { DeclarationComponent } from './components/declaration/declaration.component';
import { DeclarationService } from './services/declaration.service';
import { DeclarationTasksComponent } from './components/declaration-tasks/declaration-tasks.component';

@NgModule({
  declarations: [CreateComponent, DeclarationComponent, DeclarationDashboardComponent, DeclarationTasksComponent],
  imports: [BrowserModule, BrowserAnimationsModule, CommonModule, DeclarationRoutingModule, FormsModule, ReactiveFormsModule],
  providers: [DeclarationService],
})
export class DeclarationModule {}
