package com.example.praisebackend.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.praisebackend.models.auditLog.ActionType;
import com.example.praisebackend.models.auditLog.AuditLog;

@Repository
public interface AuditLogRepository extends JpaRepository<AuditLog, Long> {

    List<AuditLog> findByUserIdOrderByDateTimeDesc(Long userId);

    List<AuditLog> findByUserIdAndActionTypeOrderByDateTimeDesc(Long userId, ActionType actionType);
}
