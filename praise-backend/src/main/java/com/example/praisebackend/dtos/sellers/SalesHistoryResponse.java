package com.example.praisebackend.dtos.sellers;

import java.time.LocalDateTime;

import com.example.praisebackend.dtos.products.ProductOnlyResponseDTO;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SalesHistoryResponse {
    private Long id;
    private ProductOnlyResponseDTO product;
    private LocalDateTime soldDate;

}
