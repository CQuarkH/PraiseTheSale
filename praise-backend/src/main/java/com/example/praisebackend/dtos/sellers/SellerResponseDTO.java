package com.example.praisebackend.dtos.sellers;

import com.example.praisebackend.dtos.users.UserResponseDTO;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class SellerResponseDTO extends UserResponseDTO {
    private String contactPhone;
    private double rating;

}
