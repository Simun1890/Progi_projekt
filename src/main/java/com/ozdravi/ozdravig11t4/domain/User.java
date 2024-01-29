package com.ozdravi.ozdravig11t4.domain;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@Table(name = "Users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private long id;

    @Column
    private String password;

    @Column
    @JsonProperty("name")
    private String firstName;

    @Column
    @JsonProperty("surname")
    private String lastName;

    @Column
    private String email;

    @Column
    private UserRole role;
    
    @Column
    private String sex;

    @Column
    private String dateOfBirth;

    @Column
    @JsonProperty("address")
    private String adress;

    @Column(nullable = false, unique = true)
    @NotNull
    private String oib;


    // Getters i Setters za sve atribute
    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @JsonProperty("name")
    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    @JsonProperty("surname")
    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public UserRole getRole() {
        return role;
    }

    public void setRole(UserRole role) {
        this.role = role;
    }

    public String getSex() {
        return this.sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public String getDateOfBirth() {
        return this.dateOfBirth;
    }

    public void setDateOfBirth(String dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    @JsonProperty("address")
    public String getAdress() {
        return this.adress;
    }

    public void setAdress(String adress) {
        this.adress = adress;
    }

    public String getOib() {
        return this.oib;
    }

    public void setOib(String oib) {
        this.oib = oib;
    }


    // Ostali metodi i veze prema potrebi
}
