import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { EmpleadoCreateInput } from '../../../core/models/empleado.models';

@Component({
  selector: 'app-empleado-create-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <section class="card">
      <h2>Alta de empleado</h2>
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

        <button [disabled]="form.invalid" type="submit">Crear empleado</button>
      </form>
    </section>
  `
})
export class EmpleadoCreateFormComponent {
  @Output() readonly create = new EventEmitter<EmpleadoCreateInput>();

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

    this.create.emit(this.form.getRawValue() as EmpleadoCreateInput);
    this.form.reset();
  }
}
