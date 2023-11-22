package com.example.praisebackend.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.praisebackend.dtos.auditlogs.GetAuditLogsResponseDTO;
import com.example.praisebackend.dtos.mappers.AuditLogMapper;
import com.example.praisebackend.models.auditLog.ActionType;
import com.example.praisebackend.models.auditLog.AuditLog;
import com.example.praisebackend.models.auditLog.RequestSellerDataLog;
import com.example.praisebackend.repositories.AuditLogRepository;
import com.example.praisebackend.utils.LogDataExtractor;
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
        logAuditEvent(userId, ActionType.REQUEST_SELLER_DATA, description);
    }

    public void logUserBanned(Long adminId, Long bannedUserId, String reason) {
        String description = String.format(
                "User with ID %d has been banned by Admin with ID %d for the following reason: %s", bannedUserId,
                adminId, reason);
        logAuditEvent(adminId, ActionType.USER_BANNED, description);
    }

    public void logUserUnbanned(Long adminId, Long unbannedUserId, String reason) {
        String description = String.format(
                "User with ID %d has been unbanned by Admin with ID %d for the following reason: %s",
                unbannedUserId, adminId, reason);
        logAuditEvent(adminId, ActionType.USER_UNBANNED, description);
    }

    public void logChangePassword(Long userId) {
        String description = String.format("User with ID %d has changed his password", userId);
        logAuditEvent(userId, ActionType.CHANGE_PASSWORD, description);
    }

    public void logCreateProduct(Long sellerId, Long productId) {
        String description = String.format("Seller with ID %d has created a new product with ID %d", sellerId,
                productId);
        logAuditEvent(sellerId, ActionType.PRODUCT_ADDED, description);
    }

    public void logMarkProductAsSold(Long sellerId, Long productId) {
        String description = String.format("Seller with ID %d has marked as sold a product with ID %d", sellerId,
                productId);
        logAuditEvent(sellerId, ActionType.MARK_AS_SOLD, description);
    }

    public void logUnmarkProductAsSold(Long sellerId, Long productId) {
        String description = String.format("Seller with ID %d has unmarked as sold a product with ID %d", sellerId,
                productId);
        logAuditEvent(sellerId, ActionType.UNMARK_AS_SOLD, description);
    }

    public void logDeleteProduct(Long sellerId, Long productId) {
        String description = String.format("Seller with ID %d has deleted a product with ID %d", sellerId, productId);
        logAuditEvent(sellerId, ActionType.PRODUCT_DELETED, description);
    }

    public void logUnsuspendProduct(Long adminId, Long productId, String reason) {
        String description = String.format(
                "Admin with ID %d has unsuspended a product with ID %d. Reason for unsuspension: %s",
                adminId, productId, reason);
        logAuditEvent(adminId, ActionType.PRODUCT_UNSUSPENDED, description);
    }

    public void logSuspendedProduct(Long adminId, Long productId, String reason) {
        String description = String.format(
                "Admin with ID %d has suspended a product with ID %d for the following reason: %s", adminId, productId,
                reason);
        logAuditEvent(adminId, ActionType.PRODUCT_SUSPENDED, description);
    }

    public void logResolveComplaint(Long adminId, Long complaintId, String resolutionDetails) {
        String description = String.format(
                "Admin with ID %d has resolved a complaint with ID %d. Resolution details: %s", adminId, complaintId,
                resolutionDetails);
        logAuditEvent(adminId, ActionType.RESOLVE_COMPLAINT, description);
    }

    public void logUpdateComplaint(Long adminId, Long complaintId) {
        String description = String.format("Admin with ID %d has updated a complaint with ID %d", adminId, complaintId);
        logAuditEvent(adminId, ActionType.UPDATE_COMPLAINT, description);
    }

    public void logDeleteComplaint(Long adminId, Long complaintId) {
        String description = String.format("Admin with ID %d has deleted a complaint with ID %d", adminId, complaintId);
        logAuditEvent(adminId, ActionType.DELETE_COMPLAINT, description);
    }

    private void logAuditEvent(Long userId, ActionType logType, String description) {
        auditLogRepository.save(auditLogMapper.auditLogFactory(userId, logType, description));
    }

    public GetAuditLogsResponseDTO getAuditLogsByUser(Long userID) throws Exception {
        try {
            return GetAuditLogsResponseDTO.builder()
                    .auditLogs(auditLogMapper.auditLogsToAuditResponseDTOs(
                            auditLogRepository.findByUserIdOrderByDateTimeDesc(userID)))
                    .build();
        } catch (Exception e) {
            throw new Exception("Error fetching user's logs ( ID: " + userID + "): " + e.getMessage());
        }
    }

    public boolean hasBuyerRequestedSellerData(Long buyerId, Long sellerId, Long productId) {

        List<AuditLog> logs = auditLogRepository.findByUserIdAndActionTypeOrderByDateTimeDesc(buyerId,
                ActionType.REQUEST_SELLER_DATA);

        for (AuditLog log : logs) {
            RequestSellerDataLog logData = LogDataExtractor.extractRequestSellerDataFromLog(log.getDescription());

            if (logData.getSellerId().equals(sellerId) && logData.getProductId().equals(productId)) {
                return true; // Existe una coincidencia
            }
        }
        return false;
    }

}
