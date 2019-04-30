import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../shared/guards/auth.guard';
import { Role } from '../../shared/models/role';
import { DeclarationDashboardComponent } from './components/declaration-dashboard/declaration-dashboard.component';
import { CreateComponent } from './components/create/create.component';
import { DeclarationComponent } from './components/declaration/declaration.component';
import { DeclarationTasksComponent } from './components/declaration-tasks/declaration-tasks.component';

const routes: Routes = [
  {
    path: 'declaration',
    canActivate: [
      AuthGuard
    ],
    data: {
      roles: [
        Role.Employee,
        Role.ManagementAssistant,
        Role.Manager,
        Role.Admin
      ]
    },
    children: [
      {
        path: 'dashboard',
        component: DeclarationDashboardComponent
      },
      {
        path: 'task-dashboard',
        component: DeclarationTasksComponent
      },
      {
        path: 'create',
        component: CreateComponent
      },
      {
        path: ':id',
        component: DeclarationComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeclarationRoutingModule {
}
