package com.ozdravi.ozdravig11t4.service;

import com.ozdravi.ozdravig11t4.domain.UserLog;

public interface UserLogService {
    UserLog createUserLog(UserLog userlog);

    UserLog updatUserLog(UserLog userlog);
    
    UserLog findByEmail(String email);

    UserLog findByToken(String token);
}
