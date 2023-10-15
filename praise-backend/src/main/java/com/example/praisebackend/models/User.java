package com.example.praisebackend.models;

import lombok.AccessLevel;
import lombok.Data;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Data
@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;

    @Getter(AccessLevel.NONE)

    private String password;
    private String email;
    private String description;
    private boolean isBanned;
    private LocalDateTime creationTime;
    @OneToMany(mappedBy = "user")
    private List<AuditLog> logs;
}
