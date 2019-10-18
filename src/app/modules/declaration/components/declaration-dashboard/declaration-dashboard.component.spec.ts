import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeclarationDashboardComponent } from './declaration-dashboard.component';
import { RoleService } from '../../services/role.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CookieService } from 'ngx-cookie-service';
import { RouterTestingModule } from '@angular/router/testing';
import { DeclarationService } from '../../services/declaration.service';
import { Declaration } from '../../models/declaration';
import { of, throwError } from 'rxjs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeclarationComponent } from '../declaration/declaration.component';

describe('DeclarationDashboardComponent', () => {
  let component: DeclarationDashboardComponent;
  let fixture: ComponentFixture<DeclarationDashboardComponent>;
  let declarationService: DeclarationService;
  let roleService: RoleService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DeclarationComponent, DeclarationDashboardComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([{ path: 'declaration/:id', component: DeclarationComponent }]),
      ],
      providers: [RoleService, CookieService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeclarationDashboardComponent);
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

  it('should fetch all declarations', () => {
    const declarations: Declaration[] = [
      {
        id: 0,
        costs: 10.1,
        description: 'Declaration for parking 19-02-2000',
        date: new Date(),
        approvedLocal: false,
        approvedGlobal: false,
        employee: 'John Doe',
        instanceId: 'instance-01234',
        imageId: 1,
      },
      {
        id: 1,
        costs: 20.3,
        description: 'Lunch declaration, Millers',
        date: new Date(),
        approvedLocal: false,
        approvedGlobal: true,
        employee: 'Henk Visser',
        instanceId: 'instance-43210',
        imageId: 2,
      },
    ];

    spyOn(declarationService, 'fetchDeclarations').and.returnValue(of(declarations));
    component.fetchDeclarations();
    expect(component.dataSource).toEqual(declarations);
  });

  it('should not return declarations if an error was thrown', () => {
    spyOn(declarationService, 'fetchDeclarations').and.returnValue(throwError('Invalid declaration request'));
    component.fetchDeclarations();

    expect(component.dataSource.length).toBe(0);
  });

  it('should navigate to the route with the correct id', () => {
    spyOn(component, 'navigate');
    component.navigate(1542);
    expect(component.navigate).toHaveBeenCalledWith(1542);
  });
});
