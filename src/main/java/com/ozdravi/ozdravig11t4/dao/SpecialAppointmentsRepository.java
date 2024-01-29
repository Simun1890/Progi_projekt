package com.ozdravi.ozdravig11t4.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ozdravi.ozdravig11t4.domain.SpecialAppointments;

@Repository
public interface SpecialAppointmentsRepository extends JpaRepository<SpecialAppointments, Integer> {
    
    SpecialAppointments findById(int id);
}
