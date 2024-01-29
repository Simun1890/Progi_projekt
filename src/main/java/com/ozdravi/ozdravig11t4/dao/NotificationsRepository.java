package com.ozdravi.ozdravig11t4.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.ozdravi.ozdravig11t4.domain.Child;
import com.ozdravi.ozdravig11t4.domain.Notifications;

@Repository
public interface NotificationsRepository extends JpaRepository<Notifications, Integer> {
    
    public Notifications findById(int id);

    public List<Notifications> findByChildOIB(Child child);
    
}
