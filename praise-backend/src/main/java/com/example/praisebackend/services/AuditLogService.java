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

    public void logRequestSellerData(Long userId, Long sellerId, Long productId) {
        String description = String.format(
                "User with ID %d has requested data for Seller with ID %d, related to Product with ID %d", userId,
                sellerId, productId);
        logAuditEvent(userId, LogType.REQUEST_SELLER_DATA, description);
    }

    public void logUserBanned(Long adminId, Long bannedUserId, String reason) {
        String description = String.format(
                "User with ID %d has been banned by Admin with ID %d for the following reason: %s", bannedUserId,
                adminId, reason);
        logAuditEvent(adminId, LogType.USER_BANNED, description);
    }

    public void logUserUnbanned(Long adminId, Long unbannedUserId, String reason) {
        String description = String.format(
                "User with ID %d has been unbanned by Admin with ID %d for the following reason: %s",
                unbannedUserId, adminId, reason);
        logAuditEvent(adminId, LogType.USER_UNBANNED, description);
    }

    public void logChangePassword(Long userId) {
        String description = String.format("User with ID %d has changed his password", userId);
        logAuditEvent(userId, LogType.CHANGE_PASSWORD, description);
    }

    public void logCreateProduct(Long sellerId, Long productId) {
        String description = String.format("Seller with ID %d has created a new product with ID %d", sellerId,
                productId);
        logAuditEvent(sellerId, LogType.PRODUCT_ADDED, description);
    }

    public void logMarkProductAsSold(Long sellerId, Long productId) {
        String description = String.format("Seller with ID %d has marked as sold a product with ID %d", sellerId,
                productId);
        logAuditEvent(sellerId, LogType.MARK_AS_SOLD, description);
    }

    public void logDeleteProduct(Long sellerId, Long productId) {
        String description = String.format("Seller with ID %d has deleted a product with ID %d", sellerId, productId);
        logAuditEvent(sellerId, LogType.PRODUCT_DELETED, description);
    }

    public void logSuspendedProduct(Long adminId, Long productId, String reason) {
        String description = String.format(
                "Admin with ID %d has suspended a product with ID %d for the following reason: %s", adminId, productId,
                reason);
        logAuditEvent(adminId, LogType.PRODUCT_SUSPENDED, description);
    }

    public void logResolveComplaint(Long adminId, Long complaintId, String resolutionDetails) {
        String description = String.format(
                "Admin with ID %d has resolved a complaint with ID %d. Resolution details: %s", adminId, complaintId,
                resolutionDetails);
        logAuditEvent(adminId, LogType.RESOLVE_COMPLAINT, description);
    }

    public void logUpdateComplaint(Long adminId, Long complaintId) {
        String description = String.format("Admin with ID %d has updated a complaint with ID %d", adminId, complaintId);
        logAuditEvent(adminId, LogType.UPDATE_COMPLAINT, description);
    }

    public void logDeleteComplaint(Long adminId, Long complaintId) {
        String description = String.format("Admin with ID %d has deleted a complaint with ID %d", adminId, complaintId);
        logAuditEvent(adminId, LogType.DELETE_COMPLAINT, description);
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
