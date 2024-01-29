package com.ozdravi.ozdravig11t4.dao;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ozdravi.ozdravig11t4.domain.UserLog;

@Repository
public interface UserLogRepository extends JpaRepository<UserLog, String> {

    UserLog findByEmail(String email);

    UserLog findByToken(String token);
    
    List<UserLog> findAll();

}
