import { TestBed } from '@angular/core/testing';

import { EmpleadoListComponent } from './empleado-list.component';

describe('EmpleadoListComponent', () => {
  it('should emit edit action', () => {
    const fixture = TestBed.createComponent(EmpleadoListComponent);
    const component = fixture.componentInstance;
    component.empleados = [{ clave: 'EMP-1', nombre: 'A', direccion: 'B', telefono: 'C' }];

    spyOn(component.edit, 'emit');
    component.edit.emit(component.empleados[0]);

    expect(component.edit.emit).toHaveBeenCalled();
  });

  it('should emit remove when deletion is confirmed', () => {
    const fixture = TestBed.createComponent(EmpleadoListComponent);
    const component = fixture.componentInstance;
    const empleado = { clave: 'EMP-1', nombre: 'A', direccion: 'B', telefono: 'C' };

    spyOn(window, 'confirm').and.returnValue(true);
    spyOn(component.remove, 'emit');

    component.onDelete(empleado);

    expect(component.remove.emit).toHaveBeenCalledWith(empleado);
  });

  it('should not emit remove when deletion is canceled', () => {
    const fixture = TestBed.createComponent(EmpleadoListComponent);
    const component = fixture.componentInstance;
    const empleado = { clave: 'EMP-1', nombre: 'A', direccion: 'B', telefono: 'C' };

    spyOn(window, 'confirm').and.returnValue(false);
    spyOn(component.remove, 'emit');

    component.onDelete(empleado);

    expect(component.remove.emit).not.toHaveBeenCalled();
  });
});
