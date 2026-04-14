import { Routes } from '@angular/router';

import { authGuard } from './core/guards/auth.guard';
import { EmpleadosPageComponent } from './features/empleados/empleados-page.component';
import { LoginComponent } from './features/login/login.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'empleados', component: EmpleadosPageComponent, canActivate: [authGuard] },
  { path: '', pathMatch: 'full', redirectTo: 'empleados' },
  { path: '**', redirectTo: 'empleados' }
];
