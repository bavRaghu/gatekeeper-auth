package com.bavya.authservice.apikey;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class ApiKeyController {
    private final ApiKeyService apiKeyService;

    @GetMapping("/api-keys")
    public List<ApiKeyInventoryResponse>
    getAllApiKeys() {

        return apiKeyService
                .getAllApiKeys();
    }

    @PostMapping("/projects/{projectId}/api-keys")
    public ApiKeyResponse createApiKey(
            @PathVariable Long projectId,
            @RequestBody CreateApiKeyRequest request
    ) {
        return apiKeyService.createApiKey(
                projectId,
                request
        );
    }

    @GetMapping("/projects/{projectId}/api-keys")
    public List<ApiKeySummaryResponse> getApiKeys(
            @PathVariable Long projectId
    ) {

        return apiKeyService
                .getApiKeys(projectId);
    }

    @DeleteMapping("/projects/{projectId}/api-keys/{apiKeyId}")
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
