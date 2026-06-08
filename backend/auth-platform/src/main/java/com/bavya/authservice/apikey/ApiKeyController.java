package com.bavya.authservice.apikey;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
@RequiredArgsConstructor
public class ApiKeyController {
    private final ApiKeyService apiKeyService;

    @PostMapping("/{projectId}/api-keys")
    public ApiKeyResponse createApiKey(
            @PathVariable Long projectId,
            @RequestBody CreateApiKeyRequest request
    ) {
        return apiKeyService.createApiKey(
                projectId,
                request
        );
    }

    @GetMapping("/{projectId}/api-keys")
    public List<ApiKeySummaryResponse> getApiKeys(
            @PathVariable Long projectId
    ) {

        return apiKeyService
                .getApiKeys(projectId);
    }

    @DeleteMapping("/{projectId}/api-keys/{apiKeyId}")
    public void deleteApiKey(
            @PathVariable Long projectId,
            @PathVariable Long apiKeyId
    ) {

        apiKeyService.deleteApiKey(
                projectId,
                apiKeyId
        );
    }
}
