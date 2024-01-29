package com.ozdravi.ozdravig11t4.service.impl;

import com.ozdravi.ozdravig11t4.service.RequestDeniedException;
import com.ozdravi.ozdravig11t4.service.UserService;
import com.ozdravi.ozdravig11t4.domain.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import com.ozdravi.ozdravig11t4.dao.UserRepository;


@Service
public class UserServiceJpa implements UserService {

    @Autowired
    private UserRepository userRepo;


    @Override
    public java.util.List<User> listAll() {
        return userRepo.findAll();
    }


    @Override
    public User createUser(User user) {
        Assert.notNull(user, "User object must be given");
        String email = user.getEmail();
        Assert.hasText(email, "Email must be given");
        if (userRepo.countByEmail(user.getEmail()) > 0)
            throw new RequestDeniedException(
                "User with username " + user.getEmail() + " already exists"
            );
        
        return userRepo.save(user);
    }

    @Override
    public User updateUser(User user) {
        return userRepo.save(user);
  }

    @Override
    public User findById(long id){
        return userRepo.findById(id);
    }

    @Override
    public User findByEmail(String email){
        return userRepo.findByEmail(email);
    }

    @Override
    public User findByOib(String oib){
        return userRepo.findByOib(oib);
    }
}
