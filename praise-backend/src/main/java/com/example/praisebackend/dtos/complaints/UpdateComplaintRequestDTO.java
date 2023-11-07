package com.example.praisebackend.dtos.complaints;

import com.example.praisebackend.models.complaint.ComplaintStatus;

import lombok.Data;

@Data
public class UpdateComplaintRequestDTO {
    private Long adminId;
    private ComplaintStatus complaintStatus;
    private Long complaintId;

}
