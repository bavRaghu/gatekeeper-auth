package com.bavya.authservice.dashboard;

import com.bavya.authservice.apikey.ApiKeyRepository;
import com.bavya.authservice.audit.AuditLogRepository;
import com.bavya.authservice.project.*;
import com.bavya.authservice.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final ProjectMemberRepository projectMemberRepository;
    private final ApiKeyRepository apiKeyRepository;
    private final AuditLogRepository auditLogRepository;

    public DashboardResponse getDashboard(
            User user
    ) {

        List<ProjectMember> memberships =
                projectMemberRepository
                        .findByUser(user);

        long projects =
                memberships.size();

        Set<Long> projectIds =
                memberships.stream()
                        .map(pm ->
                                pm.getProject().getId())
                        .collect(Collectors.toSet());

        long apiKeys =
                apiKeyRepository.findAll()
                        .stream()
                        .filter(apiKey ->
                                projectIds.contains(
                                        apiKey.getProject()
                                                .getId()))
                        .count();

        List<ActivityResponse> activity =
                auditLogRepository
                        .findTop10ByOrderByCreatedAtDesc()
                        .stream()
                        .map(log ->
                                new ActivityResponse(
                                        log.getAction(),
                                        log.getDetails(),
                                        log.getCreatedAt()
                                ))
                        .toList();

        return new DashboardResponse(
                projects,
                apiKeys,
                auditLogRepository.count(),
                activity
        );
    }
}