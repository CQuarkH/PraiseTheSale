package com.example.praisebackend.dtos.sellers;

import lombok.Data;

@Data
public class MarkProductAsSoldRequestDTO {
    private Long sellerId;
    private String userEmail;
    private Long productId;

}
