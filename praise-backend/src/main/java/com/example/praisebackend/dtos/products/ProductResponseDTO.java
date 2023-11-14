package com.example.praisebackend.dtos.products;

import com.example.praisebackend.dtos.sellers.SellerToBuyerResponseDTO;
import com.example.praisebackend.models.product.Category;
import com.example.praisebackend.models.product.Condition;

import lombok.Data;

@Data
public class ProductResponseDTO {
    private Long id;
    private String name;
    private double price;
    private String description;
    private String imageLink;
    private Category category;
    private Condition condition;
    private SellerToBuyerResponseDTO seller;

}
