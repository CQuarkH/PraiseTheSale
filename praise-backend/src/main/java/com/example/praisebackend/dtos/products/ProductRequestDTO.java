package com.example.praisebackend.dtos.products;

import com.example.praisebackend.models.product.Category;
import com.example.praisebackend.models.product.Condition;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@Builder
public class ProductRequestDTO {

    private Long id;
    private String name;
    private double price;
    private Category category;
    private Condition condition;
    private String description;
    private String imageLink;
    private Long sellerID;
    private LocalDateTime creationTime;

}
