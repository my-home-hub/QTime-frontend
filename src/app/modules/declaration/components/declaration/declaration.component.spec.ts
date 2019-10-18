import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeclarationComponent } from './declaration.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DeclarationService } from '../../services/declaration.service';
import { RoleService } from '../../services/role.service';
import { Declaration } from '../../models/declaration';
import { of, throwError } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { RouterModule } from '@angular/router';

describe('DeclarationComponent', () => {
  let component: DeclarationComponent;
  let fixture: ComponentFixture<DeclarationComponent>;
  let declarationService: DeclarationService;
  let roleService: RoleService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DeclarationComponent
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterModule.forRoot([])
      ],
      providers: [
        CookieService,
        DeclarationService,
        RoleService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeclarationComponent);
    declarationService = fixture.debugElement.injector.get(DeclarationService);
    roleService = fixture.debugElement.injector.get(RoleService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get all the user roles', () => {
    const roles = ['Role1', 'Role2', 'Role3'];
    spyOn(roleService, 'getRoles').and.returnValue(roles);
    component.getRoles();
    expect(component.roles).toEqual(roles);
  });

  it('should return `true` if the user contains the valid role', () => {
    expect(component.roles.length).toBe(0);
    component.roles = ['Role1', 'Role2', 'Role3'];

    expect(component.containsRole('Role1')).toBe(true);
    expect(component.containsRole('Role2')).toBe(true);
    expect(component.containsRole('Role3')).toBe(true);
  });

  it('should return `false` if the user does not contain the valid role', () => {
    expect(component.roles.length).toBe(0);
    component.roles = ['Role1', 'Role2', 'Role3'];

    expect(component.containsRole('Role4')).toBe(false);
    expect(component.containsRole('Role5')).toBe(false);
    expect(component.containsRole('Role6')).toBe(false);
  });

  it('should fetch the correct declaration', () => {
    const declaration: Declaration = {
        id: 0,
        costs: 10.1,
        description: 'Declaration OV travels',
        date: new Date(),
        approvedLocal: false,
        approvedGlobal: false,
        employee: 'John Doe',
        instanceId: 'instance-01234',
        imageId: 1
      };

    spyOn(declarationService, 'fetchOneDeclaration').and.returnValue(of(declaration));
    component.fetchDeclaration();
    expect(component.declaration).toEqual(declaration);
  });

  it('should not return declarations if an error was thrown', () => {
    spyOn(declarationService, 'fetchOneDeclaration').and.returnValue(throwError('Invalid declaration request'));
    component.fetchDeclaration();

    expect(component.declaration).toBe(undefined);
  });
});
