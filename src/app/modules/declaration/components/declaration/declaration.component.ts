import { Component, OnInit } from '@angular/core';
import { DeclarationService } from '../../services/declaration.service';
import { Declaration } from '../../models/declaration';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RoleService } from '../../services/role.service';

@Component({
  selector: 'lib-declaration',
  templateUrl: './declaration.component.html',
  styleUrls: ['./declaration.component.scss']
})
export class DeclarationComponent implements OnInit {

  declaration: Declaration;
  declarationForm: FormGroup;
  declarationId: string;
  roles: string[];

  constructor(private declarationService: DeclarationService,
              private roleService: RoleService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router) { }

  /**
   * @description Creates the form, used in the HTML
   * The form contains three fields, all with `disabled` Validators
   */
  ngOnInit() {
    this.declarationForm = this.formBuilder.group({
      description: [{value: '', disabled: true}],
      costs: [{value: '', disabled: true}],
      employee: [{value: '', disabled: true}]
    });
    this.route.params.subscribe( params => this.declarationId = params['id']);
    this.fetchDeclaration();
    this.getRoles();
  }

  /**
   * @description Gets all the roles from the user
   */
  getRoles() {
    this.roles = this.roleService.getRoles();
  }

  /**
   * @description Checks whether a user contains
   * the needed role
   *
   * @return boolean
   */
  containsRole(role: string) {
    return this.roles.indexOf(role) >= 0;
  }

  /**
   * @description Fetches declaration by Id
   */
  fetchDeclaration() {
    this.declarationService.fetchOneDeclaration(this.declarationId)
      .subscribe((declaration: Declaration) => {
        this.declaration = declaration;
        this.declarationForm.patchValue(declaration);
      }, console.error);
  }

  /**
   * @description Approves the current declaration locally
   */
  approveLocalDeclaration() {
    this.declarationService.approveLocalDeclaration(this.declaration.instanceId)
      .subscribe(() => this.router.navigate(['declaration/dashboard']), console.error);
  }

  /**
   * @description Approves the current declaration globally
   */
  approveGlobalDeclaration() {
    this.declarationService.approveGlobalDeclaration(this.declaration.instanceId)
      .subscribe(() => this.router.navigate(['declaration/dashboard']), console.error);
  }
}
