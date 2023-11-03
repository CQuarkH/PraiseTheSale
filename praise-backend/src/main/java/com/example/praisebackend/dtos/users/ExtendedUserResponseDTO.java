package com.example.praisebackend.dtos.users;

import java.time.LocalDateTime;

import com.example.praisebackend.dtos.auditlogs.GetAuditLogsResponseDTO;
import com.example.praisebackend.models.Role;

import lombok.Data;

@Data
public class ExtendedUserResponseDTO {
    private Long id;
    private String name;
    private Role role;
    private String email;
    private String description;
    private boolean isBanned;
    private LocalDateTime creationTime;
    private GetAuditLogsResponseDTO auditLogs;

}
