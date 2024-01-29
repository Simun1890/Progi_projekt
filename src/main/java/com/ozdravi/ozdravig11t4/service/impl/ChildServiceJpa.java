package com.ozdravi.ozdravig11t4.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ozdravi.ozdravig11t4.dao.ChildRepository;
import com.ozdravi.ozdravig11t4.service.ChildService;
import com.ozdravi.ozdravig11t4.domain.Child;
import com.ozdravi.ozdravig11t4.domain.User;


@Service
public class ChildServiceJpa implements ChildService{

    @Autowired
    private ChildRepository childRepo;


    @Override
    public List<Child> listAll(){
        return childRepo.findAll();
    }

    @Override
    public List<Child> findByParent(User parent){
        return childRepo.findByParent(parent);
    }

    @Override
    public Child findByOib(String oib){
        return childRepo.findByOib(oib);
    }
    
}
