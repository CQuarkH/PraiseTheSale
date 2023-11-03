package com.example.praisebackend.dtos.mappers;

import org.mapstruct.Mapper;
import org.springframework.beans.factory.annotation.Autowired;

import com.example.praisebackend.dtos.sellers.SalesHistoryResponse;
import com.example.praisebackend.models.product.Product;
import com.example.praisebackend.models.user.SalesHistory;
import com.example.praisebackend.models.user.Seller;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public abstract class SalesHistoryMapper {

    @Autowired
    protected ProductMapper productMapper;

    public SalesHistory sellerProductToSalesHistory(Seller seller, Product product, LocalDateTime soldDate) {
        SalesHistory salesHistory = new SalesHistory();
        salesHistory.setSeller(seller);
        salesHistory.setProduct(product);
        salesHistory.setSoldDate(LocalDateTime.now());
        return salesHistory;
    }

    public SalesHistoryResponse salesHistoryToDTO(SalesHistory salesHistory) {
        return SalesHistoryResponse.builder()
                .id(salesHistory.getId())
                .product(productMapper.productToProductOnlyResponseDTO(salesHistory.getProduct()))
                .soldDate(salesHistory.getSoldDate())
                .build();
    }

    public List<SalesHistoryResponse> salesHistoriesToDTOs(List<SalesHistory> salesHistories) {
        return salesHistories.stream()
                .map(this::salesHistoryToDTO)
                .collect(Collectors.toList());
    }
}
