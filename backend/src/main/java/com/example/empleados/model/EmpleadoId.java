package com.example.empleados.model;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class EmpleadoId implements Serializable {

    @Column(name = "clave_prefijo", nullable = false, length = 3)
    private String clavePrefijo;

    @Column(name = "clave_numero", nullable = false)
    private Long claveNumero;

    public EmpleadoId() {
    }

    public EmpleadoId(String clavePrefijo, Long claveNumero) {
        this.clavePrefijo = clavePrefijo;
        this.claveNumero = claveNumero;
    }

    public String getClavePrefijo() {
        return clavePrefijo;
    }

    public Long getClaveNumero() {
        return claveNumero;
    }

    public String toExternalKey() {
        return clavePrefijo + "-" + claveNumero;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof EmpleadoId empleadoId)) {
            return false;
        }
        return Objects.equals(clavePrefijo, empleadoId.clavePrefijo) && Objects.equals(claveNumero, empleadoId.claveNumero);
    }

    @Override
    public int hashCode() {
        return Objects.hash(clavePrefijo, claveNumero);
    }
}
