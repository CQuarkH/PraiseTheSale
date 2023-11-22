package com.example.praisebackend.dtos.products;

import lombok.Data;

@Data
public class RelatedProductResponseDTO {
    private Long id;
    private String name;
    private String imageLink;
    private double price;
}
