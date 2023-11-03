package com.example.praisebackend.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.praisebackend.services.AdminService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;

    @GetMapping("/products")
    public ResponseEntity<?> getProducts() {
        try {
            return ResponseEntity.ok(adminService.getAllProducts());
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/products/{productId}")
    public ResponseEntity<?> getProduct(@PathVariable Long productId) {
        try {
            return ResponseEntity.ok(adminService.getProduct(productId));
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/products/weekly-products")
    public ResponseEntity<?> getWeeklyProducts() {
        try {
            return ResponseEntity.ok(adminService.getWeeklyProducts());
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/users/weekly-users")
    public ResponseEntity<?> getWeeklyUsers() {
        try {
            return ResponseEntity.ok(adminService.getWeelkyUsers());
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/users/buyers")
    public ResponseEntity<?> getAllBuyers() {
        try {
            return ResponseEntity.ok(adminService.getAllBuyers());
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/users/{userId}")
    public ResponseEntity<?> getExtendedUser(@PathVariable Long userId) {
        try {
            return ResponseEntity.ok(adminService.getExtendedUser(userId));
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/users/sellers")
    public ResponseEntity<?> getAllSellers() {
        try {
            return ResponseEntity.ok(adminService.getAllSellers());
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

}