package com.example.praisebackend.models.tokens;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
public class RateSellerToken {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long buyerId;
    private Long sellerId;
    private Long productId;
    private String token;
    private boolean used;

    public RateSellerToken(Long buyerId, Long sellerId, Long productId, String token, boolean used) {
        this.buyerId = buyerId;
        this.sellerId = sellerId;
        this.productId = productId;
        this.token = token;
        this.used = used;
    }

}
