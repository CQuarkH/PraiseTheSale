package com.example.praisebackend.dtos.mappers;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.Named;
import org.springframework.beans.factory.annotation.Autowired;

import com.example.praisebackend.dtos.products.ProductOnlyResponseDTO;
import com.example.praisebackend.dtos.products.ProductRequestDTO;
import com.example.praisebackend.dtos.products.ProductResponseDTO;
import com.example.praisebackend.dtos.products.RelatedProductResponseDTO;
import com.example.praisebackend.models.product.Category;
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

    @Autowired
    SellerMapper sellerMapper;

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
        product.setCreationTime(LocalDateTime.now());
        return product;
    }

    @Mapping(target = "seller", source = "sellerID", qualifiedByName = "idToSeller")
    public abstract Product updateProductDTOToProduct(ProductRequestDTO productDTO);

    public ProductResponseDTO productToProductResponseDTO(Product product) {
        ProductResponseDTO productResponseDTO = new ProductResponseDTO();
        productResponseDTO.setCategory(product.getCategory());
        productResponseDTO.setCondition(product.getCondition());
        productResponseDTO.setDescription(product.getDescription());
        productResponseDTO.setId(product.getId());
        productResponseDTO.setImageLink(product.getImageLink());
        productResponseDTO.setName(product.getName());
        productResponseDTO.setPrice(product.getPrice());
        productResponseDTO.setSeller(sellerMapper.sellerToBuyerResponseDTO(product.getSeller()));
        productResponseDTO.setSuspended(product.isSuspended());
        productResponseDTO.setRelatedProducts(
                findRelatedProducts(product.getSeller().getId(), product.getCategory(), product.getId()));

        return productResponseDTO;
    }

    private List<RelatedProductResponseDTO> findRelatedProducts(Long sellerId, Category category,
            Long excludeProductId) {
        List<Product> relatedProducts = productRepository.findTop5BySellerIdAndCategoryExcludingProductId(sellerId,
                category, excludeProductId);
        return relatedProducts.stream()
                .map(this::productToRelatedProductResponseDTO)
                .collect(Collectors.toList());
    }

    @Mapping(target = "creationTime", ignore = true)
    public RelatedProductResponseDTO productToRelatedProductResponseDTO(Product product) {
        RelatedProductResponseDTO relatedProductDTO = new RelatedProductResponseDTO();
        relatedProductDTO.setId(product.getId());
        relatedProductDTO.setName(product.getName());
        relatedProductDTO.setImageLink(product.getImageLink());
        relatedProductDTO.setPrice(product.getPrice());
        return relatedProductDTO;
    }

    public abstract List<ProductResponseDTO> productsToProductResponseDTOs(List<Product> products);

    @Mapping(target = "creationTime", ignore = true)
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