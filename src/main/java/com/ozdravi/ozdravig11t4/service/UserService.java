package com.ozdravi.ozdravig11t4.service;

import java.util.List;

import com.ozdravi.ozdravig11t4.domain.User;

public interface UserService{
    List<User> listAll();

    User createUser(User user);

    User updateUser(User user);

    User findById(long id);

    User findByOib(String oib);

    User findByEmail(String email);
}
