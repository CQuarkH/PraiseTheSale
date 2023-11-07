package com.example.praisebackend.dtos.products;

import lombok.Data;

@Data
public class SuspendProductRequestDTO {
    private Long adminId;
    private Long productId;
    private String reason;
}
