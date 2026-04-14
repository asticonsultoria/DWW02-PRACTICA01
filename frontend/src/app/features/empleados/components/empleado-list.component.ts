import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

import { EmpleadoView } from '../../../core/models/empleado.models';

@Component({
  selector: 'app-empleado-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="card">
      <h2>Empleados</h2>
      <table *ngIf="empleados.length; else emptyState">
        <thead>
          <tr>
            <th>Clave</th>
            <th>Nombre</th>
            <th>Direccion</th>
            <th>Telefono</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let empleado of empleados">
            <td>{{ empleado.clave }}</td>
            <td>{{ empleado.nombre }}</td>
            <td>{{ empleado.direccion }}</td>
            <td>{{ empleado.telefono }}</td>
            <td class="actions">
              <button class="secondary" (click)="edit.emit(empleado)">Editar</button>
              <button class="danger" (click)="onDelete(empleado)">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>

      <ng-template #emptyState>
        <p>No hay empleados registrados.</p>
      </ng-template>
    </section>
  `
})
export class EmpleadoListComponent {
  @Input({ required: true }) empleados: EmpleadoView[] = [];

  @Output() readonly edit = new EventEmitter<EmpleadoView>();
  @Output() readonly remove = new EventEmitter<EmpleadoView>();

  onDelete(empleado: EmpleadoView): void {
    const confirmDelete = window.confirm(`Eliminar empleado ${empleado.clave}?`);
    if (confirmDelete) {
      this.remove.emit(empleado);
    }
  }
}
