package com.bavya.authservice.audit;

import java.time.LocalDateTime;

public record AuditLogResponse(
        Long id,
        String userEmail,
        String projectName,
        String action,
        String details,
        LocalDateTime createdAt
) {
}