package com.ozdravi.ozdravig11t4.service.impl;

import org.springframework.beans.factory.annotation.Autowired;

import com.ozdravi.ozdravig11t4.dao.UserLogRepository;
import com.ozdravi.ozdravig11t4.domain.UserLog;
import com.ozdravi.ozdravig11t4.service.UserLogService;

public class UserLogServiceJpa implements UserLogService {

    @Autowired
    private UserLogRepository userLogRepo;

    @Override
    public UserLog createUserLog(UserLog userlog) {
        return userLogRepo.save(userlog);
    }

    @Override
    public UserLog updatUserLog(UserLog userlog) {
        return userLogRepo.save(userlog);
    }

    @Override
    public UserLog findByEmail(String email) {
        return userLogRepo.findByEmail(email);
    }
    
    @Override
    public UserLog findByToken(String token){
        return userLogRepo.findByToken(token);
    }
}
