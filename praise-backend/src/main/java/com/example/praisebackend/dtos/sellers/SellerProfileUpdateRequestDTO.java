package com.example.praisebackend.dtos.sellers;

import com.example.praisebackend.dtos.users.ProfileUpdateRequestDTO;

import lombok.Data;

@Data
public class SellerProfileUpdateRequestDTO extends ProfileUpdateRequestDTO {
    private String contactPhone;

}
