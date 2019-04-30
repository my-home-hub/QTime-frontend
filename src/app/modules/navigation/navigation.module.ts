import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';
import {ClickOutsideModule} from 'ng4-click-outside';

@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    ClickOutsideModule,
    RouterModule,
  ],
  exports: [
    HeaderComponent
  ]
})
export class NavigationModule { }
