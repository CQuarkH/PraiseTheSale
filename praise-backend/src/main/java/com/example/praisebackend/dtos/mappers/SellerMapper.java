package com.example.praisebackend.dtos.mappers;

import java.util.List;
import java.util.stream.Collectors;

import org.mapstruct.Mapper;

import com.example.praisebackend.dtos.sellers.SellerToBuyerResponseDTO;
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
        response.setImageLink(seller.getImageLink());
        response.setContactPhone(seller.getContactPhone());
        response.setRating(seller.getAverageRating());
        response.setRole(seller.getRole());

        return response;
    }

    public SellerToBuyerResponseDTO sellerToBuyerResponseDTO(Seller seller) {
        return SellerToBuyerResponseDTO.builder()
                .id(seller.getId())
                .name(seller.getName())
                .description(seller.getDescription())
                .rating(seller.getAverageRating())
                .email(seller.getEmail())
                .contactPhone(seller.getContactPhone())
                .imageLink(seller.getImageLink()).build();
    }

    public List<SellerToBuyerResponseDTO> sellersToBuyerResponseDTOs(List<Seller> sellers) {
        return sellers.stream().map(this::sellerToBuyerResponseDTO).collect(Collectors.toList());
    }

    public List<SellerResponseDTO> sellersToSellerResponseDTOs(List<Seller> sellers) {
        return sellers.stream().map(this::sellerToSellerResponseDTO).collect(Collectors.toList());
    }

}
