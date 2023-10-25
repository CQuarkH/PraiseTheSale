package com.example.praisebackend.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.praisebackend.dtos.ProductsResponseDTO;
import com.example.praisebackend.services.BuyerService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/buyer")
@RequiredArgsConstructor
public class BuyerController {

    private final BuyerService buyerService;

    @GetMapping("/products")
    public ResponseEntity<?> getProducts() {
        try {
            ProductsResponseDTO productsResponseDTO = buyerService.getProducts();
            return ResponseEntity.ok(productsResponseDTO);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

}
