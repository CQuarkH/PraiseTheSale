package com.example.praisebackend.dtos.complaints;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class GetResolvedComplaintsResponseDTO {
    private List<ResolveComplaintResponseDTO> resolvedComplaints;

}
