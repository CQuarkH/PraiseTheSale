package com.example.praisebackend.dtos.sellers;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SellerToBuyerResponseDTO {

    private Long id;
    private String name;
    private String description;
    private double rating;
    private String email;
    private String contactPhone;
    private String imageLink;

}
