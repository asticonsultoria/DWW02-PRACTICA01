import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { authInterceptor } from './auth.interceptor';
import { AuthSessionService } from '../services/auth-session.service';

describe('authInterceptor', () => {
  let http: HttpClient;
  let httpMock: HttpTestingController;
  let authSession: AuthSessionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthSessionService,
        provideHttpClient(withInterceptors([authInterceptor])),
        provideHttpClientTesting()
      ]
    });

    http = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
    authSession = TestBed.inject(AuthSessionService);
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('should attach Basic Authorization header when session exists', () => {
    authSession.save('admin', 'admin123');

    http.get('/api/empleados').subscribe();
    const req = httpMock.expectOne('/api/empleados');

    expect(req.request.headers.get('Authorization')?.startsWith('Basic ')).toBeTrue();
    req.flush([]);
  });
});
