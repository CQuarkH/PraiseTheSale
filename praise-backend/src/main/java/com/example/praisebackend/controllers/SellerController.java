package com.example.praisebackend.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.praisebackend.dtos.complaints.ComplaintRequestDTO;
import com.example.praisebackend.dtos.products.ProductRequestDTO;
import com.example.praisebackend.services.ComplaintService;
import com.example.praisebackend.services.SellerService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/seller")
@RequiredArgsConstructor
public class SellerController {

    private final SellerService sellerService;
    private final ComplaintService complaintService;

    @PutMapping

    @PostMapping("/products")
    public ResponseEntity<?> createProduct(@RequestBody ProductRequestDTO createProductRequest,
            @RequestHeader("Authorization") String authHeader) {
        try {
            sellerService.registerProduct(createProductRequest, authHeader);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }

    }

    @GetMapping("/products")
    public ResponseEntity<?> getSellerProducts(@RequestHeader("Authorization") String authHeader) {
        try {
            return ResponseEntity
                    .ok(sellerService.getOwnProducts(authHeader));
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }

    }

    @PutMapping("/products")
    public ResponseEntity<?> updateProduct(@RequestBody ProductRequestDTO updateProductRequest,
            @RequestHeader("Authorization") String authHeader) {
        try {
            return ResponseEntity.ok(sellerService.updateProduct(updateProductRequest, authHeader));
        } catch (Exception e) {

            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/products/{productId}")
    public ResponseEntity<?> deleteProduct(@PathVariable Long productId,
            @RequestHeader("Authorization") String authHeader) {
        try {
            sellerService.deleteProduct(productId, authHeader);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/products/{productId}/mark-as-sold")
    public ResponseEntity<?> markProductAsSold(@PathVariable Long productId,
            @RequestHeader("Authorization") String authHeader) {
        try {
            sellerService.markProductAsSold(productId, authHeader);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/sales-history")
    public ResponseEntity<?> getSalesHistory(@RequestHeader("Authorization") String authHeader) {
        try {
            return ResponseEntity.ok(sellerService.getSellerSalesHistory(authHeader));
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/complaints")
    public ResponseEntity<?> getComplaints(@RequestHeader("Authorization") String authHeader) {
        try {
            return ResponseEntity.ok(complaintService.getComplaintsByUserId(authHeader));
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/complaints")
    public ResponseEntity<?> createComplaint(@RequestBody ComplaintRequestDTO complaintRequestDTO,
            @RequestHeader("Authorization") String authHeader) {
        try {
            complaintService.createComplaint(complaintRequestDTO, authHeader);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/complaints/{complaintId}")
    public ResponseEntity<?> deleteComplaint(@PathVariable Long complaintId,
            @RequestHeader("Authorization") String authHeader) {
        try {
            complaintService.deleteComplaint(complaintId, authHeader);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }

    }

}