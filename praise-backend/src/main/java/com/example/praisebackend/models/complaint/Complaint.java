package com.example.praisebackend.models.complaint;

import java.time.LocalDateTime;

import com.example.praisebackend.models.product.Product;
import com.example.praisebackend.models.user.User;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Data
@Entity
public class Complaint {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String subject;
    private String context;
    private LocalDateTime dateTime;

    @Enumerated(EnumType.STRING)
    @Column(columnDefinition = "varchar(255) default 'PENDING'")
    private ComplaintStatus status;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "target_user_id")
    private User targetUser;
}