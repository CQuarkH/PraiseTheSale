package com.example.praisebackend.models.auditLog;

import lombok.Data;

@Data
public class RequestSellerDataLog {
    private Long userId;
    private Long sellerId;
    private Long productId;

    public RequestSellerDataLog(Long userId, Long sellerId, Long productId) {
        this.userId = userId;
        this.sellerId = sellerId;
        this.productId = productId;
    }
}
