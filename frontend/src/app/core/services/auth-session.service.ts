import { Injectable } from '@angular/core';

import { SessionCredentials } from '../models/empleado.models';

const STORAGE_KEY = 'empleados.auth';

@Injectable({ providedIn: 'root' })
export class AuthSessionService {
  getCredentials(): SessionCredentials | null {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return null;
    }

    try {
      const parsed = JSON.parse(raw) as SessionCredentials;
      if (!parsed.username || !parsed.password || !parsed.encodedAuthorization) {
        return null;
      }
      return parsed;
    } catch {
      return null;
    }
  }

  hasValidSession(): boolean {
    return this.getCredentials() !== null;
  }

  save(username: string, password: string): SessionCredentials {
    const encodedAuthorization = btoa(`${username}:${password}`);
    const credentials: SessionCredentials = { username, password, encodedAuthorization };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(credentials));
    return credentials;
  }

  clear(): void {
    localStorage.removeItem(STORAGE_KEY);
  }
}
