import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../shared/guards/auth.guard';
import { Role } from '../../shared/models/role';
import {HomeComponent} from './components/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'time',
    canActivate: [AuthGuard],
    data: {
      roles: [Role.Employee, Role.ManagementAssistant, Role.Manager, Role.Admin],
    },
    children: [],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TimesheetRoutingModule {}
