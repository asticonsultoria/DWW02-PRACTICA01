export const environment = {
  production: false,
  apiBaseUrl: (window as any).__APP_CONFIG__?.apiBaseUrl ?? 'http://localhost:8080'
};
