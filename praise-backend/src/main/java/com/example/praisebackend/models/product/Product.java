package com.example.praisebackend.models.product;

import com.example.praisebackend.models.user.Seller;

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

import java.time.LocalDateTime;

@Data
@Entity
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private double price;
    private String imageLink;

    @Enumerated(EnumType.STRING)
    @Column(name = "product_category")
    private Category category;

    @Enumerated(EnumType.STRING)
    @Column(name = "product_condition")
    private Condition condition;

    @ManyToOne
    @JoinColumn(name = "seller_id")
    private Seller seller;

    private boolean isSold = false;

    private LocalDateTime creationTime;

    private String description;

    private boolean isSuspended = false;

}