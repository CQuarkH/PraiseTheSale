package com.example.praisebackend.dtos.buyers;

import lombok.Data;

@Data
public class RequestSellerDataDTO {
    private Long userId;
    private Long sellerId;
    private Long productId;

}
