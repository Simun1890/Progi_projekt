package com.ozdravi.ozdravig11t4.domain;

import jakarta.persistence.*;

@Entity
@Table(name = "Notifications")
public class Notifications {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private int id;

    @Column(nullable = false)
    private String textOfNotif;

    @Column(nullable = false)
    private String dateOfNotif;

    @ManyToOne
    @JoinColumn(name = "receiverID", nullable = false)
    private User receiverID;

    @ManyToOne
    @JoinColumn(name = "childOIB", nullable = false)
    private Child childOIB;

    @Column
    private Boolean feedback;

    @Column
    private String additionalNote;


    public int getId() {
        return this.id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTextOfNotif() {
        return this.textOfNotif;
    }

    public void setTextOfNotif(String textOfNotif) {
        this.textOfNotif = textOfNotif;
    }

    public String getDateOfNotif() {
        return this.dateOfNotif;
    }

    public void setDateOfNotif(String dateOfNotif) {
        this.dateOfNotif = dateOfNotif;
    }

    public User getReceiverID() {
        return this.receiverID;
    }

    public void setReceiverID(User receiverID) {
        this.receiverID = receiverID;
    }

    public Boolean getFeedback() {
        return this.feedback;
    }

    public void setFeedback(Boolean feedback) {
        this.feedback = feedback;
    }

    public String getAdditionalNote() {
        return this.additionalNote;
    }

    public void setAdditionalNote(String additionalNote) {
        this.additionalNote = additionalNote;
    }

    public Child getChildOib() {
        return this.childOIB;
    }

    public void setChildOib(Child childOIB) {
        this.childOIB = childOIB;
    }
}
