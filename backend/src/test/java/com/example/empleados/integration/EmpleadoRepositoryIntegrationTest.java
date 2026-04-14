package com.example.empleados.integration;

import com.example.empleados.model.Empleado;
import com.example.empleados.model.EmpleadoId;
import com.example.empleados.repository.EmpleadoRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.ActiveProfiles;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@ActiveProfiles("test")
class EmpleadoRepositoryIntegrationTest {

    @Autowired
    private EmpleadoRepository empleadoRepository;

    @Test
    void shouldPersistAndListEmpleados() {
        Empleado empleado = new Empleado(new EmpleadoId("EMP", 1L), "Ana", "Dir", "111");
        empleadoRepository.save(empleado);

        assertThat(empleadoRepository.findAll()).hasSize(1);
        assertThat(empleadoRepository.findMaxClaveNumeroByPrefijo("EMP")).contains(1L);
    }
}
