import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { EmpleadoCreateInput, EmpleadoUpdateInput, EmpleadoView } from '../../../core/models/empleado.models';

@Injectable({ providedIn: 'root' })
export class EmpleadoApiService {
  private readonly baseUrl = `${environment.apiBaseUrl}/api/empleados`;

  constructor(private readonly http: HttpClient) {}

  list(): Observable<EmpleadoView[]> {
    return this.http.get<EmpleadoView[]>(this.baseUrl);
  }

  create(payload: EmpleadoCreateInput): Observable<EmpleadoView> {
    return this.http.post<EmpleadoView>(this.baseUrl, payload);
  }

  update(clave: string, payload: EmpleadoUpdateInput): Observable<EmpleadoView> {
    return this.http.put<EmpleadoView>(`${this.baseUrl}/${clave}`, payload);
  }

  remove(clave: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${clave}`);
  }
}
