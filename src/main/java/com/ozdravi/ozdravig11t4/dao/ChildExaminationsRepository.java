package com.ozdravi.ozdravig11t4.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ozdravi.ozdravig11t4.domain.ChildExaminations;

@Repository
public interface ChildExaminationsRepository extends JpaRepository<ChildExaminations, Integer> {
    public ChildExaminations findById(int Id);
    
}

