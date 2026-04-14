import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

import { AuthSessionService } from '../services/auth-session.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authSession = inject(AuthSessionService);
  const credentials = authSession.getCredentials();

  if (!credentials) {
    return next(req);
  }

  return next(
    req.clone({
      setHeaders: {
        Authorization: `Basic ${credentials.encodedAuthorization}`
      }
    })
  );
};
