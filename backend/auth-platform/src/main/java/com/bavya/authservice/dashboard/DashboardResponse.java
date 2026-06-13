package com.bavya.authservice.dashboard;

import java.util.List;

public record DashboardResponse(
        long projects,
        long apiKeys,
        long auditLogs,
        List<ActivityResponse> recentActivity
) {
}