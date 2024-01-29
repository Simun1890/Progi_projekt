package com.ozdravi.ozdravig11t4.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.ozdravi.ozdravig11t4.domain.Child;
import com.ozdravi.ozdravig11t4.domain.User;

@Service
public interface ChildService {
    List<Child> listAll();

    Child findByOib(String oib);

    List<Child> findByParent(User parent);
    
}
