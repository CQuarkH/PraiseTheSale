package com.example.praisebackend.dtos.mappers;

import java.util.List;
import java.util.stream.Collectors;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.example.praisebackend.dtos.sellers.SellerResponseDTO;
import com.example.praisebackend.models.user.Seller;

@Mapper(componentModel = "spring")
public abstract class SellerMapper {
    @Mapping(source = "id", target = "id")
    @Mapping(source = "name", target = "name")
    @Mapping(source = "description", target = "description")
    @Mapping(source = "rating", target = "rating")
    @Mapping(source = "imageLink", target = "imageLink")
    public abstract SellerResponseDTO sellerToSellerResponseDTO(Seller seller);

    public List<SellerResponseDTO> sellersToSellerResponseDTOs(List<Seller> sellers) {
        return sellers.stream().map(this::sellerToSellerResponseDTO).collect(Collectors.toList());
    }

}
