package com.example.empleados.service;

import com.example.empleados.dto.EmpleadoRequest;
import com.example.empleados.dto.EmpleadoResponse;
import com.example.empleados.dto.EmpleadoUpdateRequest;

import java.util.List;

public interface EmpleadoService {
    EmpleadoResponse crear(EmpleadoRequest request);
    List<EmpleadoResponse> listar();
    EmpleadoResponse obtenerPorClave(String clave);
    EmpleadoResponse actualizar(String clave, EmpleadoUpdateRequest request);
    void eliminar(String clave);
}
