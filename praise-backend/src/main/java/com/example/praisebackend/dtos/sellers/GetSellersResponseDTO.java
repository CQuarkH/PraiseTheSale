package com.example.praisebackend.dtos.sellers;

import java.util.List;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class GetSellersResponseDTO {
    private List<SellerResponseDTO> sellers;

}
