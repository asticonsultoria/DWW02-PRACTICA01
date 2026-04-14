package com.example.empleados.repository;

import com.example.empleados.model.Empleado;
import com.example.empleados.model.EmpleadoId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface EmpleadoRepository extends JpaRepository<Empleado, EmpleadoId> {

    @Query("select max(e.id.claveNumero) from Empleado e where e.id.clavePrefijo = :prefijo")
    Optional<Long> findMaxClaveNumeroByPrefijo(@Param("prefijo") String prefijo);
}
