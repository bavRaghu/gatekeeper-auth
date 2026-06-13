package com.bavya.authservice.dashboard;

import java.time.LocalDateTime;

public record ActivityResponse(
        String action,
        String details,
        LocalDateTime timestamp
) {
}