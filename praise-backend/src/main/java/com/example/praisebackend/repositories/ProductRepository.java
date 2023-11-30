package com.example.praisebackend.repositories;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.praisebackend.models.product.Category;
import com.example.praisebackend.models.product.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    List<Product> findByIsSoldFalseOrderByCreationTimeDesc();

    List<Product> findBySellerIdOrderByCreationTimeDesc(Long sellerId);

    List<Product> findBySellerIdAndIsSoldFalseAndIsSuspendedFalseOrderByCreationTimeDesc(Long sellerId);

    List<Product> findByIsSoldFalseAndIsSuspendedFalseOrderByCreationTimeDesc();

    List<Product> findByCategoryAndIsSoldFalseAndIsSuspendedFalseOrderByCreationTimeDesc(Category category);

    @Query("SELECT p FROM Product p WHERE p.creationTime >= :date")
    List<Product> getProductsCreatedAfter(LocalDateTime date);

    @Query("SELECT p FROM Product p WHERE p.seller.id = :sellerId AND p.category = :category AND p.id <> :productId AND p.isSold = false AND p.isSuspended = false")
    List<Product> findTop5BySellerIdAndCategoryExcludingProductId(Long sellerId, Category category, Long productId);

    Optional<Product> findByIdAndSellerId(Long id, Long sellerId);

}
