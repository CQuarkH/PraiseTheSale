package com.example.praisebackend.dtos;

import com.example.praisebackend.models.product.Category;
import com.example.praisebackend.models.product.Condition;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class CreateProductRequest {

    private String name;
    private double price;
    private Category category;
    private Condition condition;
    private String description;
    private String imageLink;

}
