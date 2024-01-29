package com.ozdravi.ozdravig11t4.domain;

import jakarta.persistence.*;

@Entity
@Table(name = "UserLog")
public class UserLog {

    @Id
    @Column
    private String email;

    @Column
    private String token;
    

    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getToken() {
        return this.token;
    }

    public void setToken(String token) {
        this.token = token;
    }

}
