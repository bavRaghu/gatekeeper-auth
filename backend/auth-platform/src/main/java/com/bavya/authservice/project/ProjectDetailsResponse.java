package com.bavya.authservice.project;

import com.bavya.authservice.apikey.ApiKeyResponse;
import com.bavya.authservice.apikey.ApiKeySummary;
import com.bavya.authservice.dashboard.ActivityResponse;

import java.util.List;

public record ProjectDetailsResponse(
        Long id,
        String name,
        String ownerEmail,
        List<ProjectMemberSummary> members,
        List<ApiKeySummary> apiKeys,
        List<ActivityResponse> recentActivity

) {

}