package com.example.praisebackend.services;

import org.springframework.stereotype.Service;

import com.example.praisebackend.dtos.mappers.ProductMapper;
import com.example.praisebackend.dtos.products.GetProductsOnlyResponseDTO;
import com.example.praisebackend.dtos.products.GetProductsResponseDTO;
import com.example.praisebackend.dtos.products.ProductRequestDTO;
import com.example.praisebackend.dtos.products.ProductResponseDTO;
import com.example.praisebackend.dtos.products.SuspendProductRequestDTO;
import com.example.praisebackend.models.product.Category;
import com.example.praisebackend.models.product.Product;
import com.example.praisebackend.repositories.ProductRepository;

import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;

    private final ProductMapper productMapper;

    private final AuditLogService auditLogService;

    public void createProduct(ProductRequestDTO createProductRequest) throws Exception {
        try {
            Product newProduct = productRepository.save(productMapper.createProductDTOToProduct(createProductRequest));
            auditLogService.logCreateProduct(newProduct.getSeller().getId(), newProduct.getId());
        } catch (Exception e) {
            throw new Exception("Error on product saving: " + e.getMessage());

        }
    }

    public void suspendProduct(SuspendProductRequestDTO suspendProductRequestDTO) throws Exception {
        try {
            Product product = getProductByID(suspendProductRequestDTO.getProductId());
            product.setSuspended(true);
            productRepository.save(product);
            auditLogService.logSuspendedProduct(suspendProductRequestDTO.getAdminId(),
                    suspendProductRequestDTO.getProductId(), suspendProductRequestDTO.getReason());
        } catch (Exception e) {
            throw new Exception("Error on product suspending: " + e.getMessage());

        }
    }

    public ProductResponseDTO updateProduct(ProductRequestDTO updateProductRequest)
            throws Exception {
        try {
            Product existingProduct = getProductByID(updateProductRequest.getId());

            productMapper.updateExistingProductFromDTO(updateProductRequest, existingProduct);

            return productMapper.productToProductResponseDTO(
                    productRepository.save(productMapper.updateProductDTOToProduct(updateProductRequest)));

        } catch (Exception e) {
            throw new Exception("Error on product updating: " + e.getMessage());
        }

    }

    public void deleteProduct(Long productID, Long sellerID) throws Exception {
        try {
            productRepository.deleteById(productID);
            auditLogService.logDeleteProduct(sellerID, productID);
        } catch (Exception e) {
            throw new Exception("Error on product deleting: " + e.getMessage());
        }

    }

    public void markProductAsSold(Long productID, Long sellerID) throws Exception {
        try {
            Product product = getProductByID(productID);
            product.setSold(true);
            productRepository.save(product);
            auditLogService.logMarkProductAsSold(sellerID, productID);
        } catch (Exception e) {
            throw new Exception("Error marking product as sold: " + e.getMessage());
        }

    }

    public GetProductsOnlyResponseDTO getAvailableProductsBySeller(Long sellerID) {
        return GetProductsOnlyResponseDTO.builder()
                .products(productMapper.productsToProductOnlyResponseDTOs(
                        productRepository.findBySellerIdAndIsSoldFalseAndIsSuspendedFalse(sellerID)))
                .build();
    }

    public GetProductsResponseDTO getAvailableProducts() {
        return GetProductsResponseDTO.builder()
                .products(
                        productMapper.productsToProductResponseDTOs(
                                productRepository.findByIsSoldFalseAndIsSuspendedFalse()))
                .build();
    }

    public GetProductsResponseDTO getAllProducts() {
        return GetProductsResponseDTO.builder()
                .products(productMapper.productsToProductResponseDTOs(productRepository.findAll())).build();
    }

    public GetProductsResponseDTO getWeeklyProducts() {
        return GetProductsResponseDTO.builder()
                .products(productMapper.productsToProductResponseDTOs(
                        productRepository.getProductsCreatedAfter(LocalDateTime.now().minusDays(7))))
                .build();
    }

    public GetProductsResponseDTO getProductsByCategory(Category category) {
        return GetProductsResponseDTO.builder()
                .products(productMapper.productsToProductResponseDTOs(
                        productRepository.findByCategory(category)))
                .build();
    }

    public int getProductLengthInCategory(Category category) {
        return productRepository.findByCategory(category).size();
    }

    public ProductResponseDTO getProductDTOByID(Long id) throws Exception {
        return productMapper.productToProductResponseDTO(
                productRepository.findById(id)
                        .orElseThrow(() -> new Exception("Product not found with id: " + id)));
    }

    public Product getProductByID(Long id) throws Exception {
        return productRepository.findById(id)
                .orElseThrow(() -> new Exception("Product not found with id: " + id));
    }

}
