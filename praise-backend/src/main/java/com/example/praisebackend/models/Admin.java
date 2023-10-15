package com.example.praisebackend.models;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

@Data
@Entity
public class Admin {
    @Id
    private Long id;
}