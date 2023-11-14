package com.example.praisebackend.dtos.products;

import lombok.Data;

@Data
public class ProductStatusChangeRequestDTO {
    private Long adminId;
    private Long productId;
    private String reason;

}
