package com.example.praisebackend.dtos.sellers;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SellerFromBuyerResponseDTO {

    private Long id;
    private String name;
    private String description;
    private double rating;
    private String contactPhone;
    private String contactEmail;
    private String imageLink;

}
