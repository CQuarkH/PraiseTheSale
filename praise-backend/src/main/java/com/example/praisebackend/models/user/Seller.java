package com.example.praisebackend.models.user;

import java.util.List;

import com.example.praisebackend.models.product.Product;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.Data;

@Data
@Entity
public class Seller {
    @Id
    private Long id;
    private String contactEmail;
    private double rating;
    @OneToMany(mappedBy = "seller")
    private List<Product> productList;
}