import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ApiErrorStateService {
  readonly authStale = signal(false);

  markAuthStale(): void {
    this.authStale.set(true);
  }

  clearAuthStale(): void {
    this.authStale.set(false);
  }
}
