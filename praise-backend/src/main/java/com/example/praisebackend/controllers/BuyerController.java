package com.example.praisebackend.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.praisebackend.dtos.buyers.RequestSellerDataDTO;
import com.example.praisebackend.dtos.complaints.ComplaintRequestDTO;
import com.example.praisebackend.models.product.Category;
import com.example.praisebackend.services.BuyerService;
import com.example.praisebackend.services.ComplaintService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/buyer")
@RequiredArgsConstructor
public class BuyerController {

    private final BuyerService buyerService;
    private final ComplaintService complaintService;

    @PostMapping("/request-seller-data")
    public ResponseEntity<?> requestSellerData(
            @RequestBody RequestSellerDataDTO requestSellerDataDTO,
            @RequestHeader("Authorization") String authHeader) {
        try {
            buyerService.requestSellerData(requestSellerDataDTO, authHeader);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/products")
    public ResponseEntity<?> getProducts() {
        try {
            return ResponseEntity.ok(buyerService.getProducts());
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/products/{productId}")
    public ResponseEntity<?> getProduct(@PathVariable Long productId) {
        try {
            return ResponseEntity.ok(buyerService.getProduct(productId));
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }

    }

    @GetMapping("/products/by-category/{category}")
    public ResponseEntity<?> getProductsByCategory(@PathVariable Category category) {
        try {
            return ResponseEntity.ok(buyerService.getProductsByCategory(category));
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/products/by-seller/{sellerId}")
    public ResponseEntity<?> getProductsBySeller(@PathVariable Long sellerId) {
        try {
            return ResponseEntity.ok(buyerService.getProductsBySeller(sellerId));
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/categories")
    public ResponseEntity<?> getCategories() {
        try {
            return ResponseEntity.ok(buyerService.getCategories());
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/sellers")
    public ResponseEntity<?> getSellers() {
        try {
            return ResponseEntity.ok(buyerService.getSellers());
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
