import { Component, OnInit } from '@angular/core';
import { Declaration } from '../../models/declaration';
import { DeclarationService } from '../../services/declaration.service';
import { Router } from '@angular/router';
import { RoleService } from '../../services/role.service';

@Component({
  selector: 'app-declaration-dashboard',
  templateUrl: './declaration-dashboard.component.html',
  styleUrls: ['./declaration-dashboard.component.scss'],
})
export class DeclarationDashboardComponent implements OnInit {
  dataSource: Declaration[] = [];
  roles: string[];

  constructor(private declarationService: DeclarationService, private roleService: RoleService, private router: Router) {}

  ngOnInit(): void {
    this.fetchDeclarations();
    this.getRoles();
  }

  /**
   * @description Gets all the roles from the user
   */
  getRoles(): void {
    this.roles = this.roleService.getRoles();
  }

  /**
   * @description Checks whether a user contains
   * the needed role
   *
   * @return boolean
   */
  containsRole(role: string): boolean {
    return this.roles.indexOf(role) >= 0;
  }

  /**
   * @description Fetches all declarations
   */
  fetchDeclarations(): void {
    this.declarationService.fetchDeclarations(this.roleService.getEmployeeName()).subscribe((declarations: Declaration[]) => {
      this.dataSource = declarations;
    }, console.error);
  }

  /**
   * @description Navigates to
   * declaration detail page
   */
  navigate(id: number): void {
    this.router.navigate([`declaration/${id}`]);
  }
}
