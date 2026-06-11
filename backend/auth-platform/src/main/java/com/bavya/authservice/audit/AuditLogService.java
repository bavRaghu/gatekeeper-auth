package com.bavya.authservice.audit;

import com.bavya.authservice.project.Project;
import com.bavya.authservice.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

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
}