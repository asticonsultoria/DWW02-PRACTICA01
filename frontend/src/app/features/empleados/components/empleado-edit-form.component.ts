import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { EmpleadoUpdateInput, EmpleadoView } from '../../../core/models/empleado.models';

@Component({
  selector: 'app-empleado-edit-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <section class="card" *ngIf="empleado">
      <h2>Editar {{ empleado.clave }}</h2>
      <form class="grid" [formGroup]="form" (ngSubmit)="submit()">
        <label>
          Nombre
          <input type="text" formControlName="nombre" />
        </label>

        <label>
          Direccion
          <input type="text" formControlName="direccion" />
        </label>

        <label>
          Telefono
          <input type="text" formControlName="telefono" />
        </label>

        <div class="actions">
          <button type="submit" [disabled]="form.invalid">Guardar cambios</button>
          <button type="button" class="secondary" (click)="cancel.emit()">Cancelar</button>
        </div>
      </form>
    </section>
  `
})
export class EmpleadoEditFormComponent {
  @Input() set empleado(value: EmpleadoView | null) {
    this._empleado = value;
    if (value) {
      this.form.patchValue({
        nombre: value.nombre,
        direccion: value.direccion,
        telefono: value.telefono
      });
    }
  }

  get empleado(): EmpleadoView | null {
    return this._empleado;
  }

  @Output() readonly save = new EventEmitter<EmpleadoUpdateInput>();
  @Output() readonly cancel = new EventEmitter<void>();

  private _empleado: EmpleadoView | null = null;

  readonly form;

  constructor(private readonly fb: FormBuilder) {
    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(100)]],
      direccion: ['', [Validators.required, Validators.maxLength(100)]],
      telefono: ['', [Validators.required, Validators.maxLength(100)]]
    });
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.save.emit(this.form.getRawValue() as EmpleadoUpdateInput);
  }
}
