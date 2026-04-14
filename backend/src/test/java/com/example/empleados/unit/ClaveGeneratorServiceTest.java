package com.example.empleados.unit;

import com.example.empleados.repository.EmpleadoRepository;
import com.example.empleados.service.ClaveGeneratorService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ClaveGeneratorServiceTest {

    @Mock
    private EmpleadoRepository empleadoRepository;

    @InjectMocks
    private ClaveGeneratorService claveGeneratorService;

    @Test
    void shouldGenerateSequentialNumbers() {
        when(empleadoRepository.findMaxClaveNumeroByPrefijo("EMP")).thenReturn(Optional.of(4L));

        long next = claveGeneratorService.nextNumero();

        assertThat(next).isEqualTo(5L);
        assertThat(claveGeneratorService.prefijo()).isEqualTo("EMP");
    }
}
