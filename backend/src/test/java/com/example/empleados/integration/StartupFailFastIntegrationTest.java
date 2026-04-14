package com.example.empleados.integration;

import org.junit.jupiter.api.Test;
import org.springframework.boot.WebApplicationType;
import org.springframework.boot.builder.SpringApplicationBuilder;

import static org.assertj.core.api.Assertions.assertThatThrownBy;

class StartupFailFastIntegrationTest {

    @Test
    void shouldFailFastWhenDatasourceIsInvalid() {
        assertThatThrownBy(() -> new SpringApplicationBuilder(com.example.empleados.EmpleadosApplication.class)
                .web(WebApplicationType.NONE)
                .properties(
                        "spring.datasource.url=jdbc:postgresql://localhost:65432/nonexistent",
                        "spring.datasource.username=bad",
                        "spring.datasource.password=bad",
                        "spring.jpa.hibernate.ddl-auto=validate",
                        "spring.flyway.enabled=true"
                )
                .run())
                .isInstanceOf(Exception.class);
    }
}
