package com.ozdravi.ozdravig11t4.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ozdravi.ozdravig11t4.domain.Child;
import com.ozdravi.ozdravig11t4.domain.ChildRegister;
import com.ozdravi.ozdravig11t4.domain.User;

@Repository
public interface ChildRegisterRepository extends JpaRepository<ChildRegister, Integer> {
    
    ChildRegister findByChildID(Child childID);

    List<ChildRegister> findByPediatritionID(User pediatritionID);
    
    List<ChildRegister> findByDoctorID(User doctorID);
}
