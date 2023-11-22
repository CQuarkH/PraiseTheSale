package com.example.praisebackend.dtos.products;

import lombok.Data;

@Data
public class ProductStatusChangeRequestDTO {
    private boolean suspend;
    private String sellerEmail;
    private Long adminId;
    private Long productId;
    private String reason;

}
