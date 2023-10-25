package com.example.praisebackend.services;

import org.springframework.stereotype.Service;

import com.example.praisebackend.dtos.ProductsResponseDTO;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BuyerService {

    private final ProductService productService;

    public ProductsResponseDTO getProducts() throws Exception {
        try {
            return ProductsResponseDTO
                    .builder()
                    .products(productService.getProducts())
                    .build();

        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }

    }

}
