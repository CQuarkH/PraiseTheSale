package com.example.praisebackend.models;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

@Data
@Entity
public class Buyer {
    @Id
    private Long id;
}