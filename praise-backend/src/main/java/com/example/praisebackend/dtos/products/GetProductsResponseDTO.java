package com.example.praisebackend.dtos.products;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class GetProductsResponseDTO {

    private List<ProductResponseDTO> products;

}
