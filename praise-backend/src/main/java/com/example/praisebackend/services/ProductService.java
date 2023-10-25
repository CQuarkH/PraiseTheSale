package com.example.praisebackend.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.praisebackend.models.product.Product;
import com.example.praisebackend.repositories.ProductRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;

    public List<Product> getProducts() {
        return productRepository.findAll();
    }

}
