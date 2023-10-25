package com.example.praisebackend.dtos;

import java.util.List;

import com.example.praisebackend.models.product.Product;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class ProductsResponseDTO {

    private List<Product> products;

}
