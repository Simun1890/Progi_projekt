package com.ozdravi.ozdravig11t4.domain;

import jakarta.persistence.*;

@Entity
@Table(name = "ChildExaminations")
public class ChildExaminations {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private int id;

    @ManyToOne
    @JoinColumn(name = "oibChild", nullable = false)
    private Child oibChild;

    @ManyToOne
    @JoinColumn(name = "pediatritionID", nullable = false)
    private User pediatritionID;

    @Column(nullable = false)
    private String dateOfExam;

    @Column(nullable = false)
    private String diagnosis;

    @Column
    private String sickLeave;

    @Column
    private Boolean conformation;


    public int getId() {
        return this.id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Child getOibChild() {
        return this.oibChild;
    }

    public void setOibChild(Child oibChild) {
        this.oibChild = oibChild;
    }

    public User getPediatritionID() {
        return this.pediatritionID;
    }

    public void setPediatritionID(User pediatritionID) {
        this.pediatritionID = pediatritionID;
    }

    public String getDateOfExam() {
        return this.dateOfExam;
    }

    public void setDateOfExam(String dateOfExam) {
        this.dateOfExam = dateOfExam;
    }

    public String getDiagnosis() {
        return this.diagnosis;
    }

    public void setDiagnosis(String diagnosis) {
        this.diagnosis = diagnosis;
    }

    public String getSickLeave() {
        return this.sickLeave;
    }

    public void setSickLeave(String sickLeave) {
        this.sickLeave = sickLeave;
    }

    public Boolean getConformation() {
        return this.conformation;
    }

    public void setConformation(Boolean conformation) {
        this.conformation = conformation;
    }
    
}
