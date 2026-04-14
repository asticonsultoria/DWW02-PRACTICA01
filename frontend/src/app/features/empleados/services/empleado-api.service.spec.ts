/// <reference types="jasmine" />

import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { EmpleadoView } from '../../../core/models/empleado.models';
import { authInterceptor } from '../../../core/interceptors/auth.interceptor';
import { AuthSessionService } from '../../../core/services/auth-session.service';
import { EmpleadoApiService } from './empleado-api.service';

describe('EmpleadoApiService', () => {
  let service: EmpleadoApiService;
  let http: HttpClient;
  let httpMock: HttpTestingController;
  let authSession: AuthSessionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        EmpleadoApiService,
        AuthSessionService,
        provideHttpClient(withInterceptors([authInterceptor])),
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(EmpleadoApiService);
    http = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
    authSession = TestBed.inject(AuthSessionService);
    authSession.save('admin', 'admin123');
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('should GET empleados list', () => {
    service.list().subscribe((list: EmpleadoView[]) => {
      expect(list.length).toBe(1);
      expect(list[0].clave).toBe('EMP-0001');
    });

    const req = httpMock.expectOne('http://localhost:8080/api/empleados');
    expect(req.request.method).toBe('GET');
    req.flush([{ clave: 'EMP-0001', nombre: 'A', direccion: 'B', telefono: 'C' }]);
  });

  it('should POST empleado', () => {
    service.create({ nombre: 'A', direccion: 'B', telefono: 'C' }).subscribe();
    const req = httpMock.expectOne('http://localhost:8080/api/empleados');

    expect(req.request.method).toBe('POST');
    req.flush({ clave: 'EMP-0002', nombre: 'A', direccion: 'B', telefono: 'C' });
  });

  it('should expose 400 and 500 errors from backend', () => {
    service.create({ nombre: 'A', direccion: 'B', telefono: 'C' }).subscribe({
      next: () => fail('Expected error response'),
      error: (error) => {
        expect(error.status).toBe(400);
      }
    });
    const badReq = httpMock.expectOne('http://localhost:8080/api/empleados');
    badReq.flush({ message: 'validation' }, { status: 400, statusText: 'Bad Request' });

    service.list().subscribe({
      next: () => fail('Expected error response'),
      error: (error) => {
        expect(error.status).toBe(500);
      }
    });
    const failReq = httpMock.expectOne('http://localhost:8080/api/empleados');
    failReq.flush({ message: 'server' }, { status: 500, statusText: 'Server Error' });
  });

  it('should PUT and DELETE empleado', () => {
    service.update('EMP-0001', { nombre: 'N', direccion: 'D', telefono: 'T' }).subscribe();
    const putReq = httpMock.expectOne('http://localhost:8080/api/empleados/EMP-0001');
    expect(putReq.request.method).toBe('PUT');
    putReq.flush({ clave: 'EMP-0001', nombre: 'N', direccion: 'D', telefono: 'T' });

    service.remove('EMP-0001').subscribe();
    const deleteReq = httpMock.expectOne('http://localhost:8080/api/empleados/EMP-0001');
    expect(deleteReq.request.method).toBe('DELETE');
    deleteReq.flush({});
  });

  it('should expose 404 on delete for missing empleado', () => {
    service.remove('EMP-404').subscribe({
      next: () => fail('Expected 404 error'),
      error: (error) => {
        expect(error.status).toBe(404);
      }
    });

    const deleteReq = httpMock.expectOne('http://localhost:8080/api/empleados/EMP-404');
    expect(deleteReq.request.method).toBe('DELETE');
    deleteReq.flush({ message: 'not found' }, { status: 404, statusText: 'Not Found' });
  });
});
