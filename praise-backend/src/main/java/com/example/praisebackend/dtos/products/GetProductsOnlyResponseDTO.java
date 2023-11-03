package com.example.praisebackend.dtos.products;

import java.util.List;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class GetProductsOnlyResponseDTO {

    private List<ProductOnlyResponseDTO> products;

}
