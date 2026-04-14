import { AuthSessionService } from './auth-session.service';

describe('AuthSessionService', () => {
  let service: AuthSessionService;

  beforeEach(() => {
    localStorage.clear();
    service = new AuthSessionService();
  });

  it('should persist and read credentials from localStorage', () => {
    service.save('admin', 'admin123');

    const credentials = service.getCredentials();
    expect(credentials?.username).toBe('admin');
    expect(credentials?.encodedAuthorization).toBeDefined();
    expect(service.hasValidSession()).toBeTrue();
  });
});
