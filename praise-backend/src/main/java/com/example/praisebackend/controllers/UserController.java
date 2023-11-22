package com.example.praisebackend.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.praisebackend.dtos.sellers.SellerProfileUpdateRequestDTO;
import com.example.praisebackend.dtos.users.ProfileUpdateRequestDTO;
import com.example.praisebackend.services.SellerService;
import com.example.praisebackend.services.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final SellerService sellerService;

    @GetMapping("/profile")
    public ResponseEntity<?> getUserProfile(@RequestHeader("Authorization") String authHeader) {
        try {
            return ResponseEntity.ok(userService.getUserProfileByHeader(authHeader));
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }

    }

    @GetMapping("/seller-profile")
    public ResponseEntity<?> getSellerProfile(@RequestHeader("Authorization") String authHeader) {
        try {
            return ResponseEntity.ok(sellerService.getSellerProfile(authHeader));
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/profile")
    public ResponseEntity<?> updateUserProfile(@RequestHeader("Authorization") String authHeader,
            @RequestBody ProfileUpdateRequestDTO userUpdateDTO) {
        try {
            userUpdateDTO.setAuthHeader(authHeader);
            return ResponseEntity.ok(userService.updateUserProfile(userUpdateDTO));
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/seller-profile")
    public ResponseEntity<?> updateSellerProfile(@RequestHeader("Authorization") String authHeader,
            @RequestBody SellerProfileUpdateRequestDTO sellerProfileUpdateRequestDTO) {
        try {
            return ResponseEntity.ok(sellerService.updateSellerProfile(sellerProfileUpdateRequestDTO, authHeader));

        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/delete-account")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        try {
            userService.deleteUser(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}