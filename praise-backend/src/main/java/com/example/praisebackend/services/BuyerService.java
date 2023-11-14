package com.example.praisebackend.services;

import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.example.praisebackend.auth.jwt.JwtTokenService;
import com.example.praisebackend.dtos.buyers.RequestSellerDataDTO;
import com.example.praisebackend.dtos.products.CategoryResponseDTO;
import com.example.praisebackend.dtos.products.GetCategoriesResponseDTO;
import com.example.praisebackend.dtos.products.GetProductsOnlyResponseDTO;
import com.example.praisebackend.dtos.products.GetProductsResponseDTO;
import com.example.praisebackend.dtos.products.ProductResponseDTO;
import com.example.praisebackend.dtos.sellers.GetSellersFromBuyerResponseDTO;
import com.example.praisebackend.models.product.Category;

import io.jsonwebtoken.lang.Arrays;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BuyerService {

    private final ProductService productService;
    private final SellerService sellerService;
    private final JwtTokenService jwtTokenService;
    private final AuditLogService auditLogService;

    public GetProductsResponseDTO getProducts() throws Exception {
        try {
            return productService.getAvailableProducts();
        } catch (Exception e) {
            throw new Exception("Error fetching products: " + e.getMessage());
        }

    }

    public ProductResponseDTO getProduct(Long productID) throws Exception {
        try {
            return productService.getProductDTOByID(productID);
        } catch (Exception e) {
            throw new Exception("Error on product fetching: " + e.getMessage());
        }
    }

    public GetCategoriesResponseDTO getCategories() throws Exception {
        try {
            return GetCategoriesResponseDTO.builder()
                    .categories(
                            Arrays.asList(Category.values()).stream().map(this::categoryMapper)
                                    .collect(Collectors.toList())

                    ).build();
        } catch (Exception e) {
            throw new Exception("Error fetching categories: " + e.getMessage());
        }
    }

    public GetProductsResponseDTO getProductsByCategory(Category category) throws Exception {
        try {
            return productService.getProductsByCategory(category);
        } catch (Exception e) {
            throw new Exception("Error fetching products by category (" + category + "): " + e.getMessage());
        }
    }

    public GetSellersFromBuyerResponseDTO getSellers() throws Exception {
        try {
            return sellerService.getSellersToBuyer();
        } catch (Exception e) {
            throw new Exception("Error fetching sellers: " + e.getMessage());
        }
    }

    public GetProductsOnlyResponseDTO getProductsBySeller(Long sellerId) throws Exception {
        try {
            return productService.getAvailableProductsBySeller(sellerId);
        } catch (Exception e) {
            throw new Exception("Error fetching products by seller: " + e.getMessage());
        }
    }

    public void requestSellerData(RequestSellerDataDTO requestSellerDataDTO, String authHeader) throws Exception {
        try {
            requestSellerDataDTO.setUserId(jwtTokenService.getUserIDFromHeaderToken(authHeader));
            auditLogService.logRequestSellerData(requestSellerDataDTO.getUserId(), requestSellerDataDTO.getSellerId(),
                    requestSellerDataDTO.getProductId());
        } catch (Exception e) {
            throw new Exception("Error on requesting seller data: " + e.getMessage());
        }

    }

    private CategoryResponseDTO categoryMapper(Category category) {
        return CategoryResponseDTO.builder()
                .name(category)
                .categoryDescription(category.getDescription())
                .imageLink(category.getImageLink())
                .productLength(productService.getProductLengthInCategory(category)).build();

    }

}
