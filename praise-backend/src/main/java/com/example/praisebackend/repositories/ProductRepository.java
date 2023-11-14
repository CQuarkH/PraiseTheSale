package com.example.praisebackend.repositories;

import java.util.List;
import java.util.Optional;
import java.time.LocalDateTime;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.praisebackend.models.product.Category;
import com.example.praisebackend.models.product.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    List<Product> findBySellerId(Long sellerId);

    List<Product> findBySellerIdAndIsSoldFalseAndIsSuspendedFalse(Long sellerID);

    List<Product> findByIsSoldFalseAndIsSuspendedFalse();

    List<Product> findByCategory(Category category);

    @Query("SELECT p FROM Product p WHERE p.creationTime >= :date")
    List<Product> getProductsCreatedAfter(LocalDateTime date);

    Optional<Product> findByIdAndSellerId(Long id, Long sellerId);

}
