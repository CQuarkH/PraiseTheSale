package com.example.praisebackend.models.user;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

@Data
@Entity
public class Admin {
    @Id
    private Long id;
}