package com.ozdravi.ozdravig11t4.domain;

import jakarta.persistence.*;

@Entity
@Table(name = "ChildRegister")
public class ChildRegister {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private int id;

    @ManyToOne
    @JoinColumn(name = "childID", nullable = false)
    private Child childID;

    @ManyToOne
    @JoinColumn(name = "pediatritionID")
    private User pediatritionID;

    @ManyToOne
    @JoinColumn(name = "doctorID")
    private User doctorID;

    @Column
    private String basicInfo;


    public int getId() {
        return this.id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Child getChildID() {
        return this.childID;
    }

    public void setChildID(Child childID) {
        this.childID = childID;
    }

    public User getPediatritionID() {
        return this.pediatritionID;
    }

    public void setPediatritionID(User pediatritionID) {
        this.pediatritionID = pediatritionID;
    }

    public User getDoctorID() {
        return this.doctorID;
    }

    public void setDoctorID(User doctorID) {
        this.doctorID = doctorID;
    }

    public String getBasicInfo() {
        return this.basicInfo;
    }

    public void setBasicInfo(String basicInfo) {
        this.basicInfo = basicInfo;
    }


}
