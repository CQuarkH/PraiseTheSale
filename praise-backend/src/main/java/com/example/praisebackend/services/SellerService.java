package com.example.praisebackend.services;

import org.springframework.stereotype.Service;

import com.example.praisebackend.auth.jwt.JwtTokenService;
import com.example.praisebackend.dtos.mappers.SalesHistoryMapper;
import com.example.praisebackend.dtos.mappers.SellerMapper;
import com.example.praisebackend.dtos.products.ProductRequestDTO;
import com.example.praisebackend.dtos.products.GetProductsOnlyResponseDTO;
import com.example.praisebackend.dtos.products.ProductOnlyResponseDTO;
import com.example.praisebackend.dtos.products.ProductResponseDTO;
import com.example.praisebackend.dtos.sellers.GetSalesHistoryResponse;
import com.example.praisebackend.dtos.sellers.GetSellersFromBuyerResponseDTO;
import com.example.praisebackend.dtos.sellers.GetSellersResponseDTO;
import com.example.praisebackend.models.user.SalesHistory;
import com.example.praisebackend.repositories.SalesHistoryRepository;
import com.example.praisebackend.repositories.SellerRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class SellerService {

    private final ProductService productService;
    private final JwtTokenService jwtTokenService;

    private final SalesHistoryRepository salesHistoryRepository;
    private final SellerRepository sellerRepository;

    private final SalesHistoryMapper salesHistoryMapper;
    private final SellerMapper sellerMapper;

    public ProductOnlyResponseDTO registerProduct(ProductRequestDTO createProductRequest, String authHeader)
            throws Exception {
        try {
            createProductRequest.setSellerID(jwtTokenService.getUserIDFromHeaderToken(authHeader));
            return productService.createProduct(createProductRequest);
        } catch (Exception e) {
            throw new Exception("Error on product saving: " + e.getMessage());
        }

    }

    public GetProductsOnlyResponseDTO getOwnProducts(String authHeader) throws Exception {
        try {
            return productService.getAvailableProductsBySeller(jwtTokenService.getUserIDFromHeaderToken(authHeader));
        } catch (Exception e) {
            throw new Exception("Error on fetching Seller's products: " + e.getMessage());
        }
    }

    public ProductResponseDTO getOwnProduct(Long productID, String authHeader) throws Exception {
        try {
            return productService.productToSeller(productID, jwtTokenService.getUserIDFromHeaderToken(authHeader));
        } catch (Exception e) {
            throw new Exception("Error fetching seller's product: " + e.getMessage());
        }
    }

    public ProductResponseDTO updateProduct(ProductRequestDTO updateProductRequest, String authHeader)
            throws Exception {
        try {
            updateProductRequest.setSellerID(jwtTokenService.getUserIDFromHeaderToken(authHeader));
            return productService.updateProduct(updateProductRequest);
        } catch (Exception e) {
            throw new Exception("Error on product updating: " + e.getMessage());
        }
    }

    @Transactional
    public void deleteProduct(Long productID, String authHeader) throws Exception {
        try {
            if (salesHistoryRepository.existsByProductId(productID)) {
                salesHistoryRepository.deleteByProductId(productID);
            }
            productService.deleteProduct(productID, jwtTokenService.getUserIDFromHeaderToken(authHeader));
        } catch (Exception e) {
            throw new Exception("Error on product deleting: " + e.getMessage());
        }

    }

    public void markProductAsSold(Long productID, String authHeader) throws Exception {
        try {
            productService.markProductAsSold(productID, jwtTokenService.getUserIDFromHeaderToken(authHeader));
            salesHistoryRepository.save(
                    createSalesHistory(productID, jwtTokenService.getUserIDFromHeaderToken(authHeader)));

        } catch (Exception e) {
            throw new Exception("Error on marking product as sold: " + e.getMessage());
        }

    }

    @Transactional
    public void unMarkProductAsSold(Long productID, String authHeader) throws Exception {
        try {
            productService.unMarkProductAsSold(productID, jwtTokenService.getUserIDFromHeaderToken(authHeader));
            salesHistoryRepository.deleteByProductId(productID);
        } catch (Exception e) {
            throw new Exception("Error unmarking product as sold: " + e.getMessage());
        }
    }

    public GetSalesHistoryResponse getSellerSalesHistory(String authHeader) throws Exception {
        try {
            return GetSalesHistoryResponse.builder().salesHistory(
                    salesHistoryMapper.salesHistoriesToDTOs(
                            salesHistoryRepository.findBySellerId(
                                    jwtTokenService.getUserIDFromHeaderToken(authHeader)))

            ).build();

        } catch (Exception e) {
            throw new Exception("Error on fetching Seller's Sales History: " + e.getMessage());
        }

    }

    public GetSellersFromBuyerResponseDTO getSellersToBuyer() throws Exception {
        try {
            return GetSellersFromBuyerResponseDTO.builder()
                    .sellers(
                            sellerMapper.sellersToBuyerResponseDTOs(
                                    sellerRepository.findAll()))
                    .build();
        } catch (Exception e) {
            throw new Exception("Error fetching sellers: " + e.getMessage());
        }
    }

    public GetSellersResponseDTO getSellers() throws Exception {
        try {
            return GetSellersResponseDTO.builder()
                    .sellers(sellerMapper.sellersToSellerResponseDTOs(
                            sellerRepository.findAll()))
                    .build();
        } catch (Exception e) {
            throw new Exception("Error fetching sellers: " + e.getMessage());
        }
    }

    private SalesHistory createSalesHistory(Long productID, Long sellerID) throws Exception {
        try {
            return salesHistoryMapper.sellerProductToSalesHistory(
                    sellerRepository.findById(sellerID).orElse(null),
                    productService.getProductByID(productID),
                    LocalDateTime.now());
        } catch (Exception e) {
            throw new Exception("Error creating Sale History : " + e.getMessage());
        }

    }

}
