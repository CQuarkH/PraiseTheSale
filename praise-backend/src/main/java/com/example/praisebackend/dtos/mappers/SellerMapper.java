package com.example.praisebackend.dtos.mappers;

import java.util.List;
import java.util.stream.Collectors;

import org.mapstruct.Mapper;
import com.example.praisebackend.dtos.sellers.SellerFromBuyerResponseDTO;
import com.example.praisebackend.dtos.sellers.SellerResponseDTO;
import com.example.praisebackend.models.user.Seller;

@Mapper(componentModel = "spring")
public abstract class SellerMapper {
    public SellerResponseDTO sellerToSellerResponseDTO(Seller seller) {
        SellerResponseDTO response = new SellerResponseDTO();
        response.setId(seller.getId());
        response.setName(seller.getName());
        response.setEmail(seller.getEmail());
        response.setDescription(seller.getDescription());
        response.setCreationTime(seller.getCreationTime());

        response.setContactEmail(seller.getContactEmail());
        response.setContactPhone(seller.getContactPhone());
        response.setRating(seller.getRating());

        return response;
    }

    public SellerFromBuyerResponseDTO sellerFromBuyerResponseDTO(Seller seller) {
        return SellerFromBuyerResponseDTO.builder()
                .id(seller.getId())
                .name(seller.getName())
                .description(seller.getDescription())
                .rating(seller.getRating())
                .imageLink(seller.getImageLink()).build();
    }

    public List<SellerFromBuyerResponseDTO> sellerFromBuyerResponseDTOs(List<Seller> sellers) {
        return sellers.stream().map(this::sellerFromBuyerResponseDTO).collect(Collectors.toList());
    }

    public List<SellerResponseDTO> sellersToSellerResponseDTOs(List<Seller> sellers) {
        return sellers.stream().map(this::sellerToSellerResponseDTO).collect(Collectors.toList());
    }

}
