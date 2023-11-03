package com.example.praisebackend.dtos.mappers;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.Named;
import org.springframework.beans.factory.annotation.Autowired;

import com.example.praisebackend.dtos.products.ProductOnlyResponseDTO;
import com.example.praisebackend.dtos.products.ProductRequestDTO;
import com.example.praisebackend.dtos.products.ProductResponseDTO;
import com.example.praisebackend.models.product.Product;
import com.example.praisebackend.models.user.Seller;
import com.example.praisebackend.repositories.ProductRepository;
import com.example.praisebackend.repositories.SellerRepository;

import jakarta.persistence.EntityNotFoundException;

@Mapper(componentModel = "spring", uses = { SellerMapper.class })
public abstract class ProductMapper {

    @Autowired
    protected SellerRepository sellerRepository;

    @Autowired
    private ProductRepository productRepository;

    public Product createProductDTOToProduct(ProductRequestDTO productDTO) {
        System.out.println(productDTO);
        Product product = new Product();
        product.setName(productDTO.getName());
        product.setPrice(productDTO.getPrice());
        product.setCategory(productDTO.getCategory());
        product.setCondition(productDTO.getCondition());
        product.setDescription(productDTO.getDescription());
        product.setImageLink(productDTO.getImageLink());
        product.setSeller(idToSeller(productDTO.getSellerID()));
        product.setCreationTime(productDTO.getCreationTime());
        return product;
    }

    @Mapping(target = "seller", source = "sellerID", qualifiedByName = "idToSeller")
    public abstract Product updateProductDTOToProduct(ProductRequestDTO productDTO);

    @Mapping(source = "seller", target = "sellerResponseDTO")
    public abstract ProductResponseDTO productToProductResponseDTO(Product product);

    public abstract List<ProductResponseDTO> productsToProductResponseDTOs(List<Product> products);

    @Mapping(target = "seller", source = "sellerID", qualifiedByName = "idToSeller")
    public abstract void updateExistingProductFromDTO(ProductRequestDTO dto, @MappingTarget Product existingProduct);

    public abstract ProductOnlyResponseDTO productToProductOnlyResponseDTO(Product product);

    public abstract List<ProductOnlyResponseDTO> productsToProductOnlyResponseDTOs(List<Product> products);

    @Named("idToSeller")
    protected Seller idToSeller(Long sellerID) {
        return sellerRepository.findById(sellerID)
                .orElseThrow(() -> new EntityNotFoundException("No seller found with id " + sellerID));
    }

    protected Product idToProduct(Long productId) {
        return productRepository.findById(productId)
                .orElseThrow(() -> new EntityNotFoundException("No product found with id " + productId));
    }

}