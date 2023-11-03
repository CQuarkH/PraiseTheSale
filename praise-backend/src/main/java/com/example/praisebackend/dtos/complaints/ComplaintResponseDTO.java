package com.example.praisebackend.dtos.complaints;

import java.time.LocalDateTime;

import com.example.praisebackend.dtos.products.ProductResponseDTO;
import com.example.praisebackend.dtos.users.UserResponseDTO;
import com.example.praisebackend.models.complaint.ComplaintStatus;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ComplaintResponseDTO {
    private Long id;
    private String subject;
    private String context;
    private LocalDateTime dateTime;
    private ComplaintStatus complaintStatus;
    private ProductResponseDTO product;
    private UserResponseDTO targetUser;

}
