package com.bavya.authservice.audit;

import com.bavya.authservice.project.Project;
import com.bavya.authservice.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AuditLogService {

    private final AuditLogRepository
            auditLogRepository;

    public void log(
            User user,
            Project project,
            String action,
            String details
    ) {

        AuditLog auditLog =
                new AuditLog();

        auditLog.setUser(user);
        auditLog.setProject(project);
        auditLog.setAction(action);
        auditLog.setDetails(details);

        auditLogRepository.save(auditLog);
    }

    public List<AuditLogResponse> getRecentLogs() {

        return auditLogRepository
                .findTop10ByOrderByCreatedAtDesc()
                .stream()
                .map(log ->
                        new AuditLogResponse(
                                log.getId(),
                                log.getUser()
                                        .getEmail(),
                                log.getProject()
                                        .getName(),
                                log.getAction(),
                                log.getDetails(),
                                log.getCreatedAt()
                        )
                )
                .toList();
    }
}