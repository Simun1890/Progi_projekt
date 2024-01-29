package com.ozdravi.ozdravig11t4.domain;

import jakarta.persistence.*;

@Entity
@Table(name = "TestResults")
public class TestResults {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private int id;

    @ManyToOne
    @JoinColumn(name = "oibChild", nullable = false)
    private Child oibChild;

    @ManyToOne
    @JoinColumn(name = "pediatritionID")
    private User pediatritionID;

    @Column(nullable = false)
    private String dateOfTest;

    @Column(nullable = false)
    private String typeOfResult;

    @Column(nullable = false)
    private String result;

    @Column
    private String symptomsDescription;

    @Column
    private String symptomsDuration;

    @Column
    private String physicalExamDescription;

    @Column
    private String diagnosisDescription;

    @Column
    private String diagnosisMedication;

    @Column
    private String diagnosisTreatment;

    @OneToOne
    @JoinColumn(name = "MedicalCertificate")
    private MedicalCertificates medCert;

    @Column
    private Boolean sickLeaveLetter;
    
    @ManyToOne
    @JoinColumn(name = "childDoctorOib")
    private User childDoctorOib;


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

    public String getDateOfTest() {
        return this.dateOfTest;
    }

    public void setDateOfTest(String dateOfTest) {
        this.dateOfTest = dateOfTest;
    }

    public String getTypeOfResult() {
        return this.typeOfResult;
    }

    public void setTypeOfResult(String typeOfResult) {
        this.typeOfResult = typeOfResult;
    }

    public String getResult() {
        return this.result;
    }

    public void setResult(String result) {
        this.result = result;
    }

    public String getSymptomsDescription() {
        return this.symptomsDescription;
    }

    public void setSymptomsDescription(String symptomsDescription) {
        this.symptomsDescription = symptomsDescription;
    }

    public String getSymptomsDuration() {
        return this.symptomsDuration;
    }

    public void setSymptomsDuration(String symptomsDuration) {
        this.symptomsDuration = symptomsDuration;
    }

    public String getPhysicalExamDescription() {
        return this.physicalExamDescription;
    }

    public void setPhysicalExamDescription(String physicalExamDescription) {
        this.physicalExamDescription = physicalExamDescription;
    }

    public String getDiagnosisDescription() {
        return this.diagnosisDescription;
    }

    public void setDiagnosisDescription(String diagnosisDescription) {
        this.diagnosisDescription = diagnosisDescription;
    }

    public String getDiagnosisMedication() {
        return this.diagnosisMedication;
    }

    public void setDiagnosisMedication(String diagnosisMedication) {
        this.diagnosisMedication = diagnosisMedication;
    }

    public String getDiagnosisTreatment() {
        return this.diagnosisTreatment;
    }

    public void setDiagnosisTreatment(String diagnosisTreatment) {
        this.diagnosisTreatment = diagnosisTreatment;
    }

    public MedicalCertificates getMedCert() {
        return this.medCert;
    }

    public void setMedCert(MedicalCertificates medCert) {
        this.medCert = medCert;
    }

    public Boolean isSickLeaveLetter() {
        return this.sickLeaveLetter;
    }

    public Boolean getSickLeaveLetter() {
        return this.sickLeaveLetter;
    }

    public void setSickLeaveLetter(Boolean sickLeaveLetter) {
        this.sickLeaveLetter = sickLeaveLetter;
    }

    public User getChildDoctorOib() {
        return this.childDoctorOib;
    }

    public void setChildDoctorOib(User childDoctorOib) {
        this.childDoctorOib = childDoctorOib;
    }
    

}
