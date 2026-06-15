package com.bavya.authservice.project;

public record ProjectMemberSummary(
        Long id,
        String email,
        String role
) {
}
