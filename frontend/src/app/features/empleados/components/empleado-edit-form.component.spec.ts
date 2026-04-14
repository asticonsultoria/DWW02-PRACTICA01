import { TestBed } from '@angular/core/testing';

import { EmpleadoEditFormComponent } from './empleado-edit-form.component';

describe('EmpleadoEditFormComponent', () => {
  it('should emit save payload when form is valid', () => {
    const fixture = TestBed.createComponent(EmpleadoEditFormComponent);
    const component = fixture.componentInstance;

    component.empleado = { clave: 'EMP-1', nombre: 'A', direccion: 'B', telefono: 'C' };
    fixture.detectChanges();

    spyOn(component.save, 'emit');
    component.form.setValue({ nombre: 'Nuevo', direccion: 'Dir', telefono: 'Tel' });
    component.submit();

    expect(component.save.emit).toHaveBeenCalled();
  });
});
