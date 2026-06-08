package com.bavya.authservice.auth;

public record RefreshRequest(
        String refreshToken
) {
}