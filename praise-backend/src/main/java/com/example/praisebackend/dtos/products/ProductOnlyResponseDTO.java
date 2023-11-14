package com.example.praisebackend.dtos.products;

import com.example.praisebackend.models.product.Category;
import com.example.praisebackend.models.product.Condition;

import lombok.Data;

@Data
public class ProductOnlyResponseDTO {
    private Long id;
    private String name;
    private double price;
    private String description;
    private String imageLink;
    private Category category;
    private Condition condition;

}
