package com.ozdravi.ozdravig11t4.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import com.ozdravi.ozdravig11t4.domain.Child;
import com.ozdravi.ozdravig11t4.domain.TestResults;

@Repository
public interface TestResultsRepository extends JpaRepository<TestResults, Integer> {
    
    TestResults findById(int id);

    List <TestResults> findByOibChild(Child child);
}
