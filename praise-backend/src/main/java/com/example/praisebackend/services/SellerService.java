package com.example.praisebackend.services;

import org.springframework.stereotype.Service;

import com.example.praisebackend.repositories.ProductRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SellerService {

    private final ProductRepository productRepository;

    public void createProduct() {

    }

}
