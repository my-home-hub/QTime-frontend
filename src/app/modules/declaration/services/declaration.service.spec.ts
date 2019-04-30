import {fakeAsync, TestBed, tick} from '@angular/core/testing';

import { DeclarationService } from './declaration.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {throwError} from 'rxjs';
import {Declaration} from '../models/declaration';

describe('DeclarationService', () => {
  let declarationService: DeclarationService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule(
      {
        imports: [
          HttpClientTestingModule
        ],
        providers: [
          DeclarationService
        ]
      });
    declarationService = TestBed.get(DeclarationService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    const service: DeclarationService = TestBed.get(DeclarationService);
    expect(service).toBeTruthy();
  });

  it('should fetch a single declaration', fakeAsync(() => {
    const response: Declaration = {
      id: 0,
      costs: 10.1,
      approvedLocal: false,
      approvedGlobal: false,
      employee: 'John Doe',
      instanceId: 'instance-01234'
    };

    declarationService.fetchOneDeclaration('87')
      .subscribe(res => expect(res).toEqual(response), () => throwError('Invalid Id'));

    httpTestingController
      .expectOne(r => r.method === 'GET' && r.url.endsWith('/api/declaration/87'))
      .flush(response);
  }));

  it('should fetch multiple declarations', fakeAsync(() => {
    const response: Declaration[] = [{
      id: 0,
      costs: 10.1,
      approvedLocal: false,
      approvedGlobal: false,
      employee: 'John Doe',
      instanceId: 'instance-01234'
    },
    {
      id: 1,
      costs: 20.3,
      approvedLocal: false,
      approvedGlobal: true,
      employee: 'Henk Visser',
      instanceId: 'instance-43210'
    }];

    declarationService.fetchDeclarations()
      .subscribe(res => expect(res).toEqual(response), () => throwError('Invalid declaration'));

    httpTestingController
      .expectOne(r => r.method === 'GET' && r.url.endsWith('/api/declaration'))
      .flush(response);
  }));

  it('create a declaration', fakeAsync(() => {
    const declaration = {
      file: '32892378.png',
      description: 'Parking declaration',
      costs: 38.8
    };

    declarationService.createDeclaration(declaration)
      .subscribe(() => {}, () => throwError('Invalid Id'));

    httpTestingController
      .expectOne(r => r.method === 'POST' && r.url.endsWith('/api/process/declaration'))
      .flush(null);
  }));

  it('approve a declaration locally', fakeAsync(() => {
    declarationService.approveLocalDeclaration('instance-19038103810')
      .subscribe(() => {}, () => throwError('Invalid instanceId'));

    httpTestingController
      .expectOne(r => r.method === 'PUT' && r.url.endsWith('/api/process/declaration/local/instance-19038103810'))
      .flush(null);
  }));

  it('approve a declaration globally', fakeAsync(() => {
    declarationService.approveGlobalDeclaration('instance-19038103810')
      .subscribe(() => {}, () => throwError('Invalid instanceId'));

    httpTestingController
      .expectOne(r => r.method === 'PUT' && r.url.endsWith('/api/process/declaration/global/instance-19038103810'))
      .flush(null);
  }));
});
