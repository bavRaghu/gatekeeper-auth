package com.bavya.authservice.auth;

public record LoginResponse(
        String accessToken,
        String refreshToken
) {
}