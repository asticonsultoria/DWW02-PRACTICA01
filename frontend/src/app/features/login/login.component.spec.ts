import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { LoginComponent } from './login.component';
import { ApiErrorStateService } from '../../core/services/api-error-state.service';
import { AuthSessionService } from '../../core/services/auth-session.service';

describe('LoginComponent', () => {
  it('should save credentials and navigate to empleados', () => {
    const navigateByUrl = jasmine.createSpy('navigateByUrl');

    TestBed.configureTestingModule({
      providers: [
        AuthSessionService,
        ApiErrorStateService,
        { provide: Router, useValue: { navigateByUrl } }
      ]
    });

    const fixture = TestBed.createComponent(LoginComponent);
    const component = fixture.componentInstance;
    component.form.setValue({ username: 'admin', password: 'admin123' });
    component.submit();

    expect(navigateByUrl).toHaveBeenCalledWith('/empleados');
  });
});
