package com.example.praisebackend.dtos.mappers;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.mapstruct.Mapper;
import org.springframework.beans.factory.annotation.Autowired;

import com.example.praisebackend.dtos.auditlogs.AuditLogResponseDTO;
import com.example.praisebackend.models.auditLog.AuditLog;
import com.example.praisebackend.models.auditLog.LogType;

@Mapper(componentModel = "spring")
public abstract class AuditLogMapper {

    @Autowired
    private UserMapper userMapper;

    public AuditLog auditLogFactory(Long userID, LogType logType, String description) {
        AuditLog auditLog = new AuditLog();
        auditLog.setUser(userMapper.idToUser(userID));
        auditLog.setActionType(logType);
        auditLog.setDescription(description);
        auditLog.setDateTime(LocalDateTime.now());

        return auditLog;

    }

    public AuditLogResponseDTO auditLogToAuditLogResponseDTO(AuditLog auditLog) {
        AuditLogResponseDTO auditLogResponseDTO = new AuditLogResponseDTO();
        auditLogResponseDTO.setId(auditLog.getId());
        auditLogResponseDTO.setActionType(auditLog.getActionType());
        auditLogResponseDTO.setDescription(auditLog.getDescription());
        auditLogResponseDTO.setDateTime(auditLog.getDateTime());
        return auditLogResponseDTO;
    }

    public List<AuditLogResponseDTO> auditLogsToAuditResponseDTOs(List<AuditLog> auditLogs) {
        return auditLogs.stream().map(this::auditLogToAuditLogResponseDTO).collect(Collectors.toList());

    }

}
