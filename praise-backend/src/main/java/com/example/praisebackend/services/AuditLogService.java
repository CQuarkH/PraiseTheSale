package com.example.praisebackend.services;

import org.springframework.stereotype.Service;

import com.example.praisebackend.dtos.auditlogs.GetAuditLogsResponseDTO;
import com.example.praisebackend.dtos.mappers.AuditLogMapper;
import com.example.praisebackend.models.auditLog.LogType;
import com.example.praisebackend.repositories.AuditLogRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuditLogService {

    private final AuditLogRepository auditLogRepository;
    private final AuditLogMapper auditLogMapper;

    public void logRequestSellerData(Long userId, Long sellerId) {
        String description = String.format("User with ID %d has requested data for Seller with ID %d", userId,
                sellerId);
        logAuditEvent(userId, LogType.REQUEST_SELLER_DATA, description);
    }

    public void logUserBanned(Long userId, Long bannedUserId) {
        String description = String.format("User with ID %d has been banned by Admin with ID %d", bannedUserId, userId);
        logAuditEvent(userId, LogType.USER_BANNED, description);
    }

    public void logChangePassword(Long userId) {
        String description = String.format("User with ID %d has been changed his password", userId);
        logAuditEvent(userId, LogType.CHANGE_PASSWORD, description);
    }

    private void logAuditEvent(Long userId, LogType logType, String description) {
        auditLogRepository.save(auditLogMapper.auditLogFactory(userId, logType, description));
    }

    public GetAuditLogsResponseDTO getAuditLogsByUser(Long userID) throws Exception {
        try {
            return GetAuditLogsResponseDTO.builder()
                    .auditLogs(auditLogMapper.auditLogsToAuditResponseDTOs(
                            auditLogRepository.findByUserId(userID)))
                    .build();
        } catch (Exception e) {
            throw new Exception("Error fetching user's logs ( ID: " + userID + "): " + e.getMessage());
        }
    }

}
