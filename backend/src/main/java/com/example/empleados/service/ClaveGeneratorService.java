package com.example.empleados.service;

import com.example.empleados.repository.EmpleadoRepository;
import org.springframework.stereotype.Service;

@Service
public class ClaveGeneratorService {

    private static final String PREFIJO = "EMP";

    private final EmpleadoRepository empleadoRepository;

    public ClaveGeneratorService(EmpleadoRepository empleadoRepository) {
        this.empleadoRepository = empleadoRepository;
    }

    public synchronized long nextNumero() {
        return empleadoRepository.findMaxClaveNumeroByPrefijo(PREFIJO).orElse(0L) + 1;
    }

    public String prefijo() {
        return PREFIJO;
    }
}
