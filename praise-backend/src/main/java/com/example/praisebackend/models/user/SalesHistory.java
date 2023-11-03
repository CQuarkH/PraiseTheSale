package com.example.praisebackend.models.user;

import com.example.praisebackend.models.product.Product;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
public class SalesHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "seller_id")
    private Seller seller;

    @OneToOne
    @JoinColumn(name = "product_id")
    private Product product;

    private LocalDateTime soldDate;

}
