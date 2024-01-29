package com.ozdravi.ozdravig11t4.domain;

import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "VisitHistory")
public class VisitHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private int id;

    @ManyToOne
    @JoinColumn(name = "userID", nullable = false)
    private User userID;

    @Column(nullable = false)
    @Temporal(TemporalType.DATE)
    private Date dateOfVisit;

    @Column(nullable = false)
    private String diagnosis;


    public int getId() {
        return this.id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public User getUserID() {
        return this.userID;
    }

    public void setUserID(User userID) {
        this.userID = userID;
    }

    public Date getDateOfVisit() {
        return this.dateOfVisit;
    }

    public void setDateOfVisit(Date dateOfVisit) {
        this.dateOfVisit = dateOfVisit;
    }

    public String getDiagnosis() {
        return this.diagnosis;
    }

    public void setDiagnosis(String diagnosis) {
        this.diagnosis = diagnosis;
    }

}
