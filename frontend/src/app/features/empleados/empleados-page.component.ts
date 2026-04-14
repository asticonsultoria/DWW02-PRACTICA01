import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { EmpleadoCreateInput, EmpleadoUpdateInput, EmpleadoView, UiOperationState } from '../../core/models/empleado.models';
import { ApiErrorStateService } from '../../core/services/api-error-state.service';
import { EmpleadoCreateFormComponent } from './components/empleado-create-form.component';
import { EmpleadoEditFormComponent } from './components/empleado-edit-form.component';
import { EmpleadoListComponent } from './components/empleado-list.component';
import { EmpleadoApiService } from './services/empleado-api.service';
import { FeedbackBannerComponent } from '../../shared/components/feedback-banner.component';

@Component({
  selector: 'app-empleados-page',
  standalone: true,
  imports: [
    CommonModule,
    EmpleadoListComponent,
    EmpleadoCreateFormComponent,
    EmpleadoEditFormComponent,
    FeedbackBannerComponent
  ],
  template: `
    <h1>CRUD de Empleados</h1>

    <app-feedback-banner [message]="state.successMessage ?? ''" type="success"></app-feedback-banner>
    <app-feedback-banner [message]="state.errorMessage ?? ''" type="error"></app-feedback-banner>

    <div class="grid">
      <app-empleado-create-form (create)="create($event)"></app-empleado-create-form>
      <app-empleado-edit-form
        [empleado]="selectedEmpleado"
        (save)="saveEdit($event)"
        (cancel)="selectedEmpleado = null"
      ></app-empleado-edit-form>
      <app-empleado-list [empleados]="empleados" (edit)="startEdit($event)" (remove)="delete($event)"></app-empleado-list>
    </div>
  `
})
export class EmpleadosPageComponent {
  empleados: EmpleadoView[] = [];
  selectedEmpleado: EmpleadoView | null = null;

  state: UiOperationState = {
    loading: false
  };

  constructor(
    private readonly empleadoApi: EmpleadoApiService,
    private readonly apiErrorState: ApiErrorStateService
  ) {
    this.load();
  }

  load(): void {
    this.resetMessages();
    this.state.loading = true;
    this.empleadoApi.list().subscribe({
      next: (items: EmpleadoView[]) => {
        this.empleados = items;
        this.state.loading = false;
      },
      error: (error: HttpErrorResponse) => this.handleError(error, 'No se pudo cargar el listado de empleados.')
    });
  }

  create(payload: EmpleadoCreateInput): void {
    this.resetMessages();
    this.empleadoApi.create(payload).subscribe({
      next: () => {
        this.state.successMessage = 'Empleado creado correctamente.';
        this.load();
      },
      error: (error: HttpErrorResponse) => this.handleError(error, 'No se pudo crear el empleado.')
    });
  }

  startEdit(empleado: EmpleadoView): void {
    this.selectedEmpleado = empleado;
  }

  saveEdit(payload: EmpleadoUpdateInput): void {
    if (!this.selectedEmpleado) {
      return;
    }

    this.resetMessages();
    this.empleadoApi.update(this.selectedEmpleado.clave, payload).subscribe({
      next: () => {
        this.state.successMessage = 'Empleado actualizado correctamente.';
        this.selectedEmpleado = null;
        this.load();
      },
      error: (error: HttpErrorResponse) => this.handleError(error, 'No se pudo actualizar el empleado.')
    });
  }

  delete(empleado: EmpleadoView): void {
    this.resetMessages();
    this.empleadoApi.remove(empleado.clave).subscribe({
      next: () => {
        this.state.successMessage = 'Empleado eliminado correctamente.';
        if (this.selectedEmpleado?.clave === empleado.clave) {
          this.selectedEmpleado = null;
        }
        this.load();
      },
      error: (error: HttpErrorResponse) => this.handleError(error, 'No se pudo eliminar el empleado.')
    });
  }

  private handleError(error: HttpErrorResponse, fallback: string): void {
    this.state.loading = false;
    this.state.lastErrorCode = error.status;

    if (error.status === 401 || error.status === 403) {
      this.apiErrorState.markAuthStale();
      this.state.errorMessage = 'Credenciales invalidas u obsoletas. Reingresa tus credenciales.';
      return;
    }

    if (error.status === 404) {
      this.state.errorMessage = 'El empleado ya no existe en backend.';
      return;
    }

    if (error.status === 400) {
      this.state.errorMessage = 'Los datos enviados no cumplen la validacion del backend.';
      return;
    }

    this.state.errorMessage = fallback;
  }

  private resetMessages(): void {
    this.state.successMessage = undefined;
    this.state.errorMessage = undefined;
  }
}
