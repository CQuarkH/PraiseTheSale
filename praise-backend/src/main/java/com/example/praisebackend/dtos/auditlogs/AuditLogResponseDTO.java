package com.example.praisebackend.dtos.auditlogs;

import java.time.LocalDateTime;

import com.example.praisebackend.models.auditLog.ActionType;

import lombok.Data;

@Data
public class AuditLogResponseDTO {
    private Long id;
    private ActionType actionType;
    private LocalDateTime dateTime;
    private String description;

}
