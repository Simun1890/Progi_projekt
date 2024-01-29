package com.ozdravi.ozdravig11t4.domain;

import jakarta.persistence.*;

@Entity
public class SpecialAppointments {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private int id;

    @ManyToOne
    @JoinColumn(name = "patientID", nullable = false)
    private User patientID;

    @Column(nullable = false)
    private String dateOfApp;

    @Column(nullable = false)
    private String location;

    @Column
    private String conformation;


    public int getId() {
        return this.id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public User getPatientID() {
        return this.patientID;
    }

    public void setPatientID(User patientID) {
        this.patientID = patientID;
    }

    public String getDateOfApp() {
        return this.dateOfApp;
    }

    public void setDateOfApp(String dateOfApp) {
        this.dateOfApp = dateOfApp;
    }

    public String getLocation() {
        return this.location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getConformation() {
        return this.conformation;
    }

    public void setConformation(String conformation) {
        this.conformation = conformation;
    }
    
}
