import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Declaration} from '../models/declaration';

@Injectable({
  providedIn: 'root'
})
export class DeclarationService {

  constructor(private httpClient: HttpClient) { }

  fetchOneDeclaration(id: string) {
    return this.httpClient.get<Declaration>(`/api/declaration/${id}`);
  }

  fetchDeclarations() {
    return this.httpClient.get<Declaration[]>(`/api/declaration`);
  }

  createDeclaration(declaration) {
    return this.httpClient.post(`/api/process/declaration`, declaration, { responseType: 'text' as 'json' });
  }

  approveLocalDeclaration(instanceId: string) {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    return this.httpClient.put(`/api/process/declaration/local/${instanceId}`,
      {approvedLocal: true},
      { headers, responseType: 'text' as 'json' });
  }

  approveGlobalDeclaration(instanceId: string) {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    return this.httpClient.put(`/api/process/declaration/global/${instanceId}`,
      { approvedGlobal: true },
      { headers, responseType: 'text' as 'json' });
  }
}
