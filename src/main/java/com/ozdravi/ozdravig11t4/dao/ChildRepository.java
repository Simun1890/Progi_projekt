package com.ozdravi.ozdravig11t4.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ozdravi.ozdravig11t4.domain.Child;
import com.ozdravi.ozdravig11t4.domain.User;

@Repository
public interface ChildRepository extends JpaRepository<Child, Integer> {
    
    List<Child> findByParent(User parent);
    
    List<Child> findAll();

    Child findByOib(String oib);
}
