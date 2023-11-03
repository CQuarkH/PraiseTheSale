package com.example.praisebackend.dtos.sellers;

import lombok.Data;

@Data
public class SellerResponseDTO {

    private Long id;
    private String name;
    private String description;
    private double rating;
    private String imageLink;

}
