package com.bavya.authservice.project;

public record MemberResponse(
        Long userId,
        String email,
        Role role
) {
}
