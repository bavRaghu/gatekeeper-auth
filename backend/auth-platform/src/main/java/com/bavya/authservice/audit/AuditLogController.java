package com.bavya.authservice.audit;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/audit-logs")
public class AuditLogController {

    private final AuditLogService
            auditLogService;

    @GetMapping
    public List<AuditLogResponse>
    getAuditLogs() {

        System.out.println("AUDIT LOGS HIT");

        return auditLogService
                .getRecentLogs();
    }
}