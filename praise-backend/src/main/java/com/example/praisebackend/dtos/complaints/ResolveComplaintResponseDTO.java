package com.example.praisebackend.dtos.complaints;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ResolveComplaintResponseDTO {
    private ComplaintResponseDTO complaint;
    private String resolutionDetails;

}
