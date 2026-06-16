package com.bavya.authservice.apikey;

import java.time.LocalDateTime;

public record ApiKeyInventoryResponse(
        Long id,
        String name,
        String projectName,
        LocalDateTime createdAt,
        LocalDateTime lastUsedAt
) {
}