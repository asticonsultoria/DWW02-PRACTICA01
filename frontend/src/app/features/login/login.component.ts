import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ApiErrorStateService } from '../../core/services/api-error-state.service';
import { AuthSessionService } from '../../core/services/auth-session.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <section class="card" style="max-width: 480px; margin: 2rem auto;">
      <h1>Acceso</h1>
      <p>Ingresa credenciales Basic Auth para operar el CRUD de empleados.</p>

      <div *ngIf="errorMessage" class="feedback error">{{ errorMessage }}</div>

      <form class="grid" [formGroup]="form" (ngSubmit)="submit()">
        <label>
          Usuario
          <input type="text" formControlName="username" />
        </label>

        <label>
          Password
          <input type="password" formControlName="password" />
        </label>

        <button type="submit" [disabled]="form.invalid">Guardar y continuar</button>
      </form>
    </section>
  `
})
export class LoginComponent {
  readonly form;

  errorMessage = '';

  constructor(
    private readonly fb: FormBuilder,
    private readonly authSession: AuthSessionService,
    private readonly apiErrorState: ApiErrorStateService,
    private readonly router: Router
  ) {
    this.form = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });

    if (this.apiErrorState.authStale()) {
      this.errorMessage = 'Sesion expirada o credenciales invalidas. Vuelve a autenticarte.';
      this.apiErrorState.clearAuthStale();
    }
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const username = this.form.controls.username.value ?? '';
    const password = this.form.controls.password.value ?? '';

    this.authSession.save(username, password);
    this.router.navigateByUrl('/empleados');
  }
}
