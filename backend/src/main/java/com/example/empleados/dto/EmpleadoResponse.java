package com.example.empleados.dto;

import com.example.empleados.model.Empleado;

public class EmpleadoResponse {

    private String clave;
    private String nombre;
    private String direccion;
    private String telefono;

    public EmpleadoResponse() {
    }

    public EmpleadoResponse(String clave, String nombre, String direccion, String telefono) {
        this.clave = clave;
        this.nombre = nombre;
        this.direccion = direccion;
        this.telefono = telefono;
    }

    public static EmpleadoResponse from(Empleado empleado) {
        return new EmpleadoResponse(
                empleado.getId().toExternalKey(),
                empleado.getNombre(),
                empleado.getDireccion(),
                empleado.getTelefono()
        );
    }

    public String getClave() {
        return clave;
    }

    public String getNombre() {
        return nombre;
    }

    public String getDireccion() {
        return direccion;
    }

    public String getTelefono() {
        return telefono;
    }
}
