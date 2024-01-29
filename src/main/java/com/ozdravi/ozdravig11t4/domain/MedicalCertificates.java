package com.ozdravi.ozdravig11t4.domain;

import jakarta.persistence.*;

@Entity
@Table(name = "MedicalCertificates")
public class MedicalCertificates {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private int id;

    @ManyToOne
    @JoinColumn(name = "oibChild", nullable = false)
    private Child oibChild;

    @Column(nullable = false)
    private String dateOfCert;

    @Column(nullable = false)
    private String reason;

    @Column
    private String endDate;

    @Column
    private String pedConf;


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

    public String getDateOfCert() {
        return this.dateOfCert;
    }

    public void setDateOfCert(String dateOfCert) {
        this.dateOfCert = dateOfCert;
    }

    public String getReason() {
        return this.reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public String getEndDate() {
        return this.endDate;
    }

    public void setEndDate(String endDate) {
        this.endDate = endDate;
    }

    public String getPedConf() {
        return this.pedConf;
    }

    public void setPedConf(String pedConf) {
        this.pedConf = pedConf;
    }

    
}
