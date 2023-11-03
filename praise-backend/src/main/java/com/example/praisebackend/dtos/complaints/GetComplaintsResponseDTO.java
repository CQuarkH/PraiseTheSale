package com.example.praisebackend.dtos.complaints;

import java.util.List;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class GetComplaintsResponseDTO {

    private List<ComplaintResponseDTO> complaints;

}
