package com.example.praisebackend.dtos.auditlogs;

import java.util.List;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class GetAuditLogsResponseDTO {
    private List<AuditLogResponseDTO> auditLogs;

}
