package com.example.empleados.unit;

import com.example.empleados.dto.EmpleadoUpdateRequest;
import com.example.empleados.model.Empleado;
import com.example.empleados.model.EmpleadoId;
import com.example.empleados.repository.EmpleadoRepository;
import com.example.empleados.service.ClaveGeneratorService;
import com.example.empleados.service.impl.EmpleadoServiceImpl;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class EmpleadoServiceUpdateTest {

    @Mock
    private EmpleadoRepository empleadoRepository;

    @Mock
    private ClaveGeneratorService claveGeneratorService;

    @InjectMocks
    private EmpleadoServiceImpl empleadoService;

    @Test
    void shouldUpdateFieldsWhenEmpleadoExists() {
        EmpleadoId id = new EmpleadoId("EMP", 1L);
        Empleado empleado = new Empleado(id, "Nombre", "Direccion", "Telefono");

        when(empleadoRepository.findById(id)).thenReturn(Optional.of(empleado));
        when(empleadoRepository.save(any(Empleado.class))).thenAnswer(invocation -> invocation.getArgument(0));

        EmpleadoUpdateRequest request = new EmpleadoUpdateRequest();
        request.setNombre("Nuevo Nombre");
        request.setDireccion("Nueva Direccion");
        request.setTelefono("999");

        var response = empleadoService.actualizar("EMP-1", request);

        assertThat(response.getClave()).isEqualTo("EMP-1");
        assertThat(response.getNombre()).isEqualTo("Nuevo Nombre");
    }
}
