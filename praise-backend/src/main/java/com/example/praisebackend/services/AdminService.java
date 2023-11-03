package com.example.praisebackend.services;

import org.springframework.stereotype.Service;

import com.example.praisebackend.dtos.products.GetProductsResponseDTO;
import com.example.praisebackend.dtos.products.ProductResponseDTO;
import com.example.praisebackend.dtos.users.ExtendedUserResponseDTO;
import com.example.praisebackend.dtos.users.GetUsersResponseDTO;
import com.example.praisebackend.models.Role;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final ProductService productService;
    private final UserService userService;

    public GetProductsResponseDTO getAllProducts() throws Exception {
        try {
            return productService.getAllProducts();
        } catch (Exception e) {
            throw new Exception("Error on products fetching: " + e.getMessage());
        }

    }

    public ProductResponseDTO getProduct(Long productID) throws Exception {
        try {
            return productService.getProductDTOByID(productID);
        } catch (Exception e) {
            throw new Exception("Error on product (ID: " + productID + ") fetching: " + e.getMessage());
        }
    }

    public GetProductsResponseDTO getWeeklyProducts() throws Exception {
        try {
            return productService.getWeeklyProducts();
        } catch (Exception e) {
            throw new Exception(
                    "Error on weekly products fetching: " + e.getMessage());
        }
    }

    public GetUsersResponseDTO getWeelkyUsers() throws Exception {
        try {
            return userService.weeklyUsers();
        } catch (Exception e) {
            throw new Exception("Error on weekly users fetching: " + e.getMessage());
        }
    }

    public GetUsersResponseDTO getAllSellers() throws Exception {
        try {
            return userService.getUsersByRole(Role.SELLER);
        } catch (Exception e) {
            throw new Exception("Error on sellers fetching: " + e.getMessage());
        }
    }

    public GetUsersResponseDTO getAllBuyers() throws Exception {
        try {
            return userService.getUsersByRole(Role.BUYER);
        } catch (Exception e) {
            throw new Exception("Error on buyers fetching: " + e.getMessage());
        }
    }

    public ExtendedUserResponseDTO getExtendedUser(Long userID) throws Exception {
        try {
            return userService.getExtendedUser(userID);

        } catch (Exception e) {
            throw new Exception("Error on extended user fetching: " + e.getMessage());
        }

    }

}
