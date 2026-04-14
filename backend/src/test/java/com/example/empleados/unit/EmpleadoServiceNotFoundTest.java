package com.example.empleados.unit;

import com.example.empleados.dto.EmpleadoUpdateRequest;
import com.example.empleados.exception.ResourceNotFoundException;
import com.example.empleados.repository.EmpleadoRepository;
import com.example.empleados.service.ClaveGeneratorService;
import com.example.empleados.service.impl.EmpleadoServiceImpl;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class EmpleadoServiceNotFoundTest {

    @Mock
    private EmpleadoRepository empleadoRepository;

    @Mock
    private ClaveGeneratorService claveGeneratorService;

    @InjectMocks
    private EmpleadoServiceImpl empleadoService;

    @Test
    void shouldThrowNotFoundWhenUpdatingUnknownEmpleado() {
        when(empleadoRepository.findById(new com.example.empleados.model.EmpleadoId("EMP", 999L))).thenReturn(Optional.empty());

        EmpleadoUpdateRequest request = new EmpleadoUpdateRequest();
        request.setNombre("A");
        request.setDireccion("B");
        request.setTelefono("C");

        assertThatThrownBy(() -> empleadoService.actualizar("EMP-999", request))
                .isInstanceOf(ResourceNotFoundException.class);
    }

    @Test
    void shouldThrowNotFoundWhenDeletingUnknownEmpleado() {
        when(empleadoRepository.existsById(new com.example.empleados.model.EmpleadoId("EMP", 999L))).thenReturn(false);

        assertThatThrownBy(() -> empleadoService.eliminar("EMP-999"))
                .isInstanceOf(ResourceNotFoundException.class);
    }
}
