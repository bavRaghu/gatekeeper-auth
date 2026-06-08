package com.bavya.authservice.apikey;

public record ApiKeyResponse(
        Long id,
        String name,
        String apiKey
) {
}