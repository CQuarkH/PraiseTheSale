package com.example.praisebackend.models.complaint;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Data
@Entity
public class Complaint {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String context;
    private LocalDateTime dateTime;
    @Enumerated(EnumType.STRING)
    private ComplaintStatus status;
    private Long productId;
    private Long targetUserId;
}