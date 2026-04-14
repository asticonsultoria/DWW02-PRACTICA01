import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';

import { ApiErrorStateService } from '../services/api-error-state.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const apiErrorState = inject(ApiErrorStateService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 || error.status === 403) {
        apiErrorState.markAuthStale();
      }

      return throwError(() => error);
    })
  );
};
