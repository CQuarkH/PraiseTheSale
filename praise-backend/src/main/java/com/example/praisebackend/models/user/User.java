package com.example.praisebackend.models.user;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

import com.example.praisebackend.models.Role;
import com.example.praisebackend.models.auditLog.AuditLog;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
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

    @Enumerated(EnumType.STRING)
    private Role role;

    private String password;
    private String email;
    private String description;
    private boolean isBanned;
    private LocalDateTime creationTime;
    @OneToMany(mappedBy = "user")
    private List<AuditLog> logs;
}
