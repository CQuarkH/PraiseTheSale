package com.example.praisebackend.dtos.complaints;

import lombok.Data;

@Data
public class ResolveComplaintRequestDTO {
    private Long adminId;
    private Long complaintId;
    private String resolutionDetails;

}
