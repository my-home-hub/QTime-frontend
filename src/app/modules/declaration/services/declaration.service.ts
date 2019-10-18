import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Declaration } from '../models/declaration';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DeclarationService {
  constructor(private httpClient: HttpClient) {}

  fetchOneDeclaration(id: string): Observable<Declaration> {
    return this.httpClient.get<Declaration>(`/api/declaration/${id}`);
  }

  fetchDeclarations(employee: string): Observable<Declaration[]> {
    return this.httpClient.get<Declaration[]>(`/api/declaration?employee=${employee}`);
  }

  fetchOpenDeclarations(): Observable<Declaration[]> {
    return this.httpClient.get<Declaration[]>('/api/declaration');
  }

  createDeclaration(declaration): Observable<any> {
    return this.httpClient.post('/api/process/declaration', declaration, { responseType: 'text' as 'json' });
  }

  fetchDeclarationImage(imageId: number): Observable<any> {
    return this.httpClient.get(`/api/declaration/image/${imageId}`, { responseType: 'blob' });
  }

  approveLocalDeclaration(instanceId: string): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    return this.httpClient.put(
      `/api/process/declaration/local/${instanceId}`,
      { approvedLocal: true },
      { headers, responseType: 'text' as 'json' },
    );
  }

  approveGlobalDeclaration(instanceId: string): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    return this.httpClient.put(
      `/api/process/declaration/global/${instanceId}`,
      { approvedGlobal: true },
      { headers, responseType: 'text' as 'json' },
    );
  }
}
