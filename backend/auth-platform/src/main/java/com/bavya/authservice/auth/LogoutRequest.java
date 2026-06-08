package com.bavya.authservice.auth;

public record LogoutRequest(
        String refreshToken
) {
}
