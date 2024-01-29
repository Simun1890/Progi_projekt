package com.ozdravi.ozdravig11t4.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ozdravi.ozdravig11t4.domain.User;

public interface UserRepository
 extends JpaRepository<User, Long> {
    int countByEmail(String email);

    User findById(long id);

    User findByOib(String oib);

    User findByEmail(String email);

    List<User> findAll();
    
}
