package com.bavya.authservice.auth;

public record LoginRequest(
        String email,
        String password
) {
}