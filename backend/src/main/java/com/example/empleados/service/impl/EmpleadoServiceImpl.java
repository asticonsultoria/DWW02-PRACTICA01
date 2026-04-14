package com.example.empleados.service.impl;

import com.example.empleados.dto.EmpleadoRequest;
import com.example.empleados.dto.EmpleadoResponse;
import com.example.empleados.dto.EmpleadoUpdateRequest;
import com.example.empleados.exception.ResourceNotFoundException;
import com.example.empleados.model.Empleado;
import com.example.empleados.model.EmpleadoId;
import com.example.empleados.repository.EmpleadoRepository;
import com.example.empleados.service.ClaveGeneratorService;
import com.example.empleados.service.EmpleadoService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class EmpleadoServiceImpl implements EmpleadoService {

    private static final Pattern CLAVE_PATTERN = Pattern.compile("^EMP-([0-9]+)$");

    private final EmpleadoRepository empleadoRepository;
    private final ClaveGeneratorService claveGeneratorService;

    public EmpleadoServiceImpl(EmpleadoRepository empleadoRepository, ClaveGeneratorService claveGeneratorService) {
        this.empleadoRepository = empleadoRepository;
        this.claveGeneratorService = claveGeneratorService;
    }

    @Override
    public EmpleadoResponse crear(EmpleadoRequest request) {
        long nextNumero = claveGeneratorService.nextNumero();
        EmpleadoId id = new EmpleadoId(claveGeneratorService.prefijo(), nextNumero);
        Empleado empleado = new Empleado(id, request.getNombre(), request.getDireccion(), request.getTelefono());
        return EmpleadoResponse.from(empleadoRepository.save(empleado));
    }

    @Override
    public List<EmpleadoResponse> listar() {
        return empleadoRepository.findAll().stream().map(EmpleadoResponse::from).toList();
    }

    @Override
    public EmpleadoResponse obtenerPorClave(String clave) {
        Empleado empleado = empleadoRepository.findById(parseClave(clave))
                .orElseThrow(() -> new ResourceNotFoundException("Empleado no encontrado"));
        return EmpleadoResponse.from(empleado);
    }

    @Override
    public EmpleadoResponse actualizar(String clave, EmpleadoUpdateRequest request) {
        Empleado empleado = empleadoRepository.findById(parseClave(clave))
                .orElseThrow(() -> new ResourceNotFoundException("Empleado no encontrado"));
        empleado.setNombre(request.getNombre());
        empleado.setDireccion(request.getDireccion());
        empleado.setTelefono(request.getTelefono());
        return EmpleadoResponse.from(empleadoRepository.save(empleado));
    }

    @Override
    public void eliminar(String clave) {
        EmpleadoId id = parseClave(clave);
        if (!empleadoRepository.existsById(id)) {
            throw new ResourceNotFoundException("Empleado no encontrado");
        }
        empleadoRepository.deleteById(id);
    }

    private EmpleadoId parseClave(String clave) {
        Matcher matcher = CLAVE_PATTERN.matcher(clave);
        if (!matcher.matches()) {
            throw new IllegalArgumentException("La clave debe cumplir patrón EMP-<numero>");
        }
        long numero = Long.parseLong(matcher.group(1));
        return new EmpleadoId("EMP", numero);
    }
}
