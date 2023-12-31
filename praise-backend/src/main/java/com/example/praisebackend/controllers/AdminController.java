package com.example.praisebackend.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.praisebackend.dtos.complaints.ResolveComplaintRequestDTO;
import com.example.praisebackend.dtos.complaints.UpdateComplaintRequestDTO;
import com.example.praisebackend.dtos.products.ProductStatusChangeRequestDTO;
import com.example.praisebackend.dtos.users.UserStatusChangeRequestDTO;
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

    @GetMapping("/products/by-seller/{sellerId}")
    public ResponseEntity<?> getProductsBySeller(@PathVariable Long sellerId) {
        try {
            return ResponseEntity.ok(adminService.getProductsBySeller(sellerId));
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/products/{productId}/suspend")
    public ResponseEntity<?> suspendProduct(@RequestBody ProductStatusChangeRequestDTO productStatusChangeRequestDTO,
            @RequestHeader("Authorization") String authHeader,
            @PathVariable Long productId) {
        try {
            productStatusChangeRequestDTO.setProductId(productId);
            adminService.updateProductSuspensionStatus(productStatusChangeRequestDTO, authHeader);
            return ResponseEntity.ok().build();
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

    @PutMapping("/users/{userId}/ban-user")
    public ResponseEntity<?> banUser(@RequestBody UserStatusChangeRequestDTO banUserRequestDTO,
            @RequestHeader("Authorization") String authHeader,
            @PathVariable Long userId) {
        try {
            banUserRequestDTO.setUserId(userId);
            adminService.updateUserBanStatus(banUserRequestDTO, authHeader);
            return ResponseEntity.ok().build();
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

    @GetMapping("/complaints")
    public ResponseEntity<?> getAllComplaints() {
        try {
            return ResponseEntity.ok(adminService.getComplaints());
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/complaints/{complaintId}")
    public ResponseEntity<?> getComplaintById(@PathVariable Long complaintId) {
        try {
            return ResponseEntity.ok(adminService.getComplaintByID(complaintId));
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/complaints/{complaintId}")
    public ResponseEntity<?> updateComplaint(
            @PathVariable Long complaintId,
            @RequestBody UpdateComplaintRequestDTO updateComplaintRequestDTO,
            @RequestHeader("Authorization") String authHeader) {
        try {
            updateComplaintRequestDTO.setComplaintId(complaintId);
            return ResponseEntity.ok(adminService.updateComplaint(updateComplaintRequestDTO, authHeader));
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }

    }

    @PutMapping("/complaints/{complaintId}/resolve")
    public ResponseEntity<?> resolveComplaint(
            @PathVariable Long complaintId,
            @RequestBody ResolveComplaintRequestDTO resolveComplaintRequestDTO,
            @RequestHeader("Authorization") String authHeader) {
        try {
            resolveComplaintRequestDTO.setComplaintId(complaintId);
            return ResponseEntity.ok(adminService.resolveComplaint(resolveComplaintRequestDTO, authHeader));
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

}