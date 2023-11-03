package com.example.praisebackend.dtos.auditlogs;

import java.time.LocalDateTime;

import com.example.praisebackend.models.auditLog.LogType;

import lombok.Data;

@Data
public class AuditLogResponseDTO {
    private Long id;
    private LogType actionType;
    private LocalDateTime dateTime;
    private String description;

}
