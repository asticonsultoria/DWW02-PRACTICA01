package com.example.empleados.controller;

import com.example.empleados.dto.EmpleadoRequest;
import com.example.empleados.dto.EmpleadoResponse;
import com.example.empleados.dto.EmpleadoUpdateRequest;
import com.example.empleados.service.EmpleadoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/empleados")
@Tag(name = "Empleados")
@SecurityRequirement(name = "basicAuth")
public class EmpleadoController {

    private final EmpleadoService empleadoService;

    public EmpleadoController(EmpleadoService empleadoService) {
        this.empleadoService = empleadoService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Crear empleado")
    public EmpleadoResponse crear(@Valid @RequestBody EmpleadoRequest request) {
        return empleadoService.crear(request);
    }

    @GetMapping
    @Operation(summary = "Listar empleados")
    public List<EmpleadoResponse> listar() {
        return empleadoService.listar();
    }

    @GetMapping("/{clave}")
    @Operation(summary = "Obtener empleado por clave")
    public EmpleadoResponse obtener(@PathVariable String clave) {
        return empleadoService.obtenerPorClave(clave);
    }

    @PutMapping("/{clave}")
    @Operation(summary = "Actualizar empleado")
    public EmpleadoResponse actualizar(@PathVariable String clave, @Valid @RequestBody EmpleadoUpdateRequest request) {
        return empleadoService.actualizar(clave, request);
    }

    @DeleteMapping("/{clave}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @Operation(summary = "Eliminar empleado")
    public void eliminar(@PathVariable String clave) {
        empleadoService.eliminar(clave);
    }
}
